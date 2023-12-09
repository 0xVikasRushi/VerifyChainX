import express from 'express';
import Events from '../models/event.model.js';

const router = express.Router();

router.get('/allevents', async (req, res) => {

  try {
    const events = await Events.find({}); 

    res.status(200).json(events);

    } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
    }
});

export default router;
