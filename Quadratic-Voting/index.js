import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import createRoute from "./routes/create.js";
import voteRoute from "./routes/vote.js";
import eventDetails from "./routes/eventDetails.js";
import allEvents from './routes/allEvents.js';
import deleteEvent from './routes/deleteEvent.js';
import voterDetails from './routes/getVoterdetails.js'
import calculatevotes from './routes/calculatevotes.js'

import "./models/event.model.js"
import "./models/voter.model.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

/*****************  MONGOOSE CONNECTION  ********************************************  */

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("db connected");
});
mongoose.connection.on("error", (err) => {
  console.log("error in connecting...", err);
});


/*****************  ROUTES ********************************************  */

app.use("/api", createRoute);
app.use("/api", voteRoute);
app.use("/api", eventDetails);
app.use("/api", allEvents);
app.use("/api", deleteEvent);
app.use("/api", voterDetails);
app.use("/api", calculatevotes);





app.get("/", (req, res) => {
  return res.send("Hello World..!!");
});

app.listen(PORT || 3003, () =>
  console.log(`Listening on Port ${PORT}`)
);