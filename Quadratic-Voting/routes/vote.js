import express from 'express';
import dotenv from 'dotenv';
import ethers from 'ethers';
import Voters from '../models/voter.model.js';
import Events from '../models/event.model.js';
import submitVoterAttestation from "../utils/newvoterattestation.js"

dotenv.config();

const router = express.Router();
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = '0x21b11d2EfB6302Fb19911b5c09e2Ce8c932D00c2';

router.post('/qvote/:eventuuid/:voter_address', async (req, res) => {
  try {
    // const votingContract = new ethers.Contract(contractAddress, VotingContractAbi, wallet);
    const { eventuuid, voter_address } = req.params;
    const checkEventuuid = await Events.findOne({ id : eventuuid });
    if (!checkEventuuid) {
      return res.status(404).send('Event not found, uuid of event is wrong');
    }
    const { voter_name , project_name, votes } = req.body;

    if (!voter_address || !project_name || votes === undefined) {
      return res.status(400).send('Invalid or missing parameters in the request body');
    }
    const event = await Events.findOne({ id: eventuuid });

    
    if (!event || !event.event_data) {
      return res.status(400).send('Event or subjects not found for this event');
    }
    let eventSubjects = [];
    try {
      eventSubjects = JSON.parse(event.event_data);
    } catch (error) {
      console.error('Error parsing event data:', error);
    }
    
    if (!Array.isArray(eventSubjects)) {
      return res.status(400).send('Invalid event data format');
    }
    
    const projectExists = eventSubjects.some(subject => subject.title === project_name);
    
    if (!projectExists) {
      return res.status(400).send('No project with that name exists in this event');
    }
    
    const findVoter = await Voters.findOne({event_uuid: eventuuid , voter_address : voter_address });
    if(!findVoter){
      try{
        const voterProjects = {};
      eventSubjects.forEach(subject => {
        voterProjects[subject.title] = subject.title === project_name ? votes : 0;
      });
         const { uid }  = await submitVoterAttestation(checkEventuuid.attestation_uid ,voter_name , voter_address ,project_name , votes);
         await Voters.create({
            event_uuid: eventuuid,
            event_attestation_uid :checkEventuuid.attestation_uid,
            voter_name : voter_name,
            voter_address: voter_address,
            vote_data: voterProjects,
            projects_attestations : {
              [project_name]: uid !== '' ? uid : '',
            }

        });
      }
      catch(error){
        return res.status(500).json({error : 'Invalid wallet address'});
      }
    }
    else{
      try{
      const { uid }  = await submitVoterAttestation(checkEventuuid.attestation_uid ,voter_name , voter_address ,project_name , votes);
      console.log(uid);
        await Voters.findOneAndUpdate(
            { event_uuid : eventuuid , voter_address: voter_address },
            {
            event_uuid: eventuuid,
            event_attestation_uid :checkEventuuid.attestation_uid,
            voter_name : voter_name,
            voter_address: voter_address,
            vote_data: {
                ...findVoter.vote_data,
                [project_name]: votes,
            },
            projects_attestations : {
              ...findVoter.projects_attestations,
              [project_name]: uid !== '' ? uid : '',
            }
        },
        { new: true }
    );
      }
      catch(error){
        return res.status(500).json({error : 'Invalid wallet addresss'});
      }
    }
      return res.status(200).json({ message: 'Votes updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
