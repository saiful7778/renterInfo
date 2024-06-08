import { Router } from "express";
import serverHelper from "../utils/server-helper.js";
import inputCheck from "../utils/input-check.js";
import { reservationModel } from "../models/reservationModel.js";
import mongoose from "mongoose";
import devDebug from "../utils/dev-debug.js";

const route = Router();

// create reservation id
route.get("/", (req, res) => {
  serverHelper(async () => {
    const reservationId = new mongoose.Types.ObjectId();
    devDebug("reservation id is created");
    res.status(201).send({
      success: true,
      data: { reservationId: reservationId.toString() },
    });
  }, res);
});

route.post("/", (req, res) => {
  const bodyData = req.body;
  const {
    reservationId,
    pickupDate,
    returnDate,
    duration,
    discount,
    vehicleType,
    vehicle,
    firstName,
    lastName,
    email,
    phone,
    total,
  } = bodyData;

  const check = inputCheck(
    [
      reservationId,
      pickupDate,
      returnDate,
      duration,
      discount,
      vehicleType,
      vehicle,
      firstName,
      lastName,
      email,
      phone,
      total,
    ],
    res
  );
  if (!check) return;

  const { make, model } = vehicle;
  const check2 = inputCheck([make, model], res);
  if (!check2) return;

  serverHelper(async () => {
    const reservation = await reservationModel.create({
      _id: reservationId,
      pickupDate,
      returnDate,
      duration,
      discount,
      vehicleType,
      vehicle: { make, model },
      firstName,
      lastName,
      email,
      phone,
      total,
    });
    devDebug("new reservation is created");
    res.status(201).send({
      success: true,
      data: reservation,
    });
  }, res);
});

export { route as reservation };
