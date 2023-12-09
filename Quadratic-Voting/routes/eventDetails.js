import express from 'express';
import Events from '../models/event.model.js';
const router = express.Router();

router.get('/details/:id/:secret_key?', async (req, res) => {
  const { id, secret_key } = req.params;

  try {
    const event = await Events.findOne({ id: id });
    console.log("-----" +event);

    if (!event) {
      return res.status(404).send('Event not found');
    }
        // Assuming isAdmin logic, uncomment if needed
    // const isAdmin = event.secret_key && event.secret_key === secret_key;
    // delete event.secret_key;

    // if (isAdmin) {
    //   event.voters = voters;
    // }
    res.send({
        event: event
    });
    } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
    }
});

export default router;
