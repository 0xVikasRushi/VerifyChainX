import express from 'express';
import moment from 'moment';
const router = express.Router();
import Events from '../models/event.model.js';
import Voters from '../models/voter.model.js';
router.post('/create/:host_address', async (req, res) => {
  const event = req.body;
  const host_address = req.params.host_address;
  const vote_data = [];

  for (const subject of event.subjects) {
    vote_data.push({
      ...subject,
      votes: 0,
    });
  }

  const voters = new Array(event.num_voters).fill({
    vote_data: vote_data,
  });

  try {
    const createdEvent = await Events.create({
      event_title: event.event_title,
      event_description: event.event_description,
      event_owner: host_address,
      attestation_uid : "",
      num_voters: event.num_voters,
      credits_per_voter: event.credits_per_voter,
      start_event_date: moment(event.start_event_date).toDate(),
      end_event_date: moment(event.end_event_date).toDate(),
      event_data: JSON.stringify(event.subjects),
    });

    await Voters.insertMany(
      voters.map((voter) => ({
        event_uuid: createdEvent.id,
        voter_name: voter.voter_name,
        vote_data: voter.vote_data,
      }))
    );
    const fetchedEvent = await Events.findOne({id : createdEvent.id});
    const isCompleted = moment() > moment(fetchedEvent.end_event_date);
     //! creating attestation to the for the event and sending it as a response 
    const eventData = {
      event_uuid: fetchedEvent.id, 
      event_name: fetchedEvent.event_title,
      event_description: fetchedEvent.event_description,
      event_owner: host_address, //* will fetch from fronted later
      event_createdAt: fetchedEvent.start_event_date.toString(),
      event_endedAt: fetchedEvent.end_event_date.toString(),
      isCompleted : isCompleted,
    };

    await Events.findOneAndUpdate(
      { id: fetchedEvent.id },
       { attestation_uid: "" },
        { new: true }
      );

    res.send({ message : " Event created successfully " });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error' + error);
  }
});

export default router;
