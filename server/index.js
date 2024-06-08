import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { reservation } from "./src/routes/reservation.js";
import getEnvVar from "./src/utils/env-var.js";

const dbUrl = getEnvVar("DB_CONNECT");
const port = getEnvVar("PORT");
const frontendUrl = getEnvVar("FORNTEND_URL");

(async () => {
  try {
    console.log("connecting...");
    await connect(dbUrl);
    console.log("connected DB");
  } catch (err) {
    console.log("connection failed");
    console.log(err);
  }
})();

const app = express();

const accessSite = [frontendUrl, "http://localhost:5173"];

app.use(
  cors({
    origin: accessSite,
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Server is running",
  });
});

app.use("/reservation", reservation);

// not found route
app.get("*", (req, res) => {
  res.status(404).send({
    success: false,
    message: "Not found!",
  });
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
