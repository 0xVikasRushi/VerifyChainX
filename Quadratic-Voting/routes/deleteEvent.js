import express from 'express';
import Events from '../models/event.model.js';
import Voters from '../models/newvoter.model.js';

const router = express.Router();

router.delete('/delete/:event_uuid/:host_address', async (req, res) => {
  const { event_uuid, host_address } = req.params;

  try {
    const eventExist = await Events.findOne({ id: event_uuid });
    const voterExist = await Events.findOne({ id: event_uuid ,  event_owner: host_address });

    if (!eventExist) {
      return res.status(404).send('Event not found');
    }
    if (!voterExist) {
      return res.status(404).send('You are not the owner of this event');
    }

    await Events.deleteOne({ id: event_uuid , event_owner: host_address });
    await Voters.deleteMany({ event_uuid: event_uuid });

  
    res.send({
        messsage : "Event and Corresponding voters Deleted Successfully",
    });
    } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
    }
});

export default router;
