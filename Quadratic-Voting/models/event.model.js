import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
    index: true,
  },
  secret_key: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  event_title: String,
  event_description: String,
  event_owner: String,
  attestation_uid: { type: String, default: "" },
  num_voters: { type: Number, default: 10 },
  credits_per_voter: { type: Number, default: 5 },
  start_event_date: { type: Date, default: Date.now },
  end_event_date: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  event_data: { type: mongoose.Schema.Types.Mixed },
});

export default mongoose.model("Events", eventsSchema);
