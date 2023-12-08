import mongoose from "mongoose";

const VotersSchema = new mongoose.Schema({
  event_uuid: { type: String },
  event_attestation_uid: { type: String },
  voter_name: String,
  voter_address: String,
  vote_data: { type: mongoose.Schema.Types.Mixed },
  projects_attestations: { type: mongoose.Schema.Types.Mixed },
});

export default mongoose.model("Voters", VotersSchema);
