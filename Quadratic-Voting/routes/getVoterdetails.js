import express from 'express';
import newVoters from '../models/newvoter.model.js';
const router = express.Router();

router.get('/voterdetails/:voter_address', async (req, res) => {
  const {  voter_address } = req.params;

  try {
    const voters = await newVoters.find({ voter_address: voter_address });

    if (!voters) {
      return res.status(404).send('Voting data not found');
    }
    res.status(200).json({
     voters: voters,
    });
    } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
    }
});

export default router;
