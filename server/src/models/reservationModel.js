import { Schema, model } from "mongoose";

const reservationSchema = new Schema(
  {
    pickupDate: {
      type: String,
      required: [true, "Pickup date is required"],
    },
    returnDate: {
      type: String,
      required: [true, "Return date is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    discount: Number,
    vehicleType: {
      type: String,
      required: [true, "Vehicle type is required"],
    },
    vehicle: {
      make: {
        type: String,
        required: [true, "Vehicle make is required"],
      },
      model: {
        type: String,
        required: [true, "Vehicle model is required"],
      },
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email in not valid"],
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      minlength: 11,
      maxlength: 11,
      validate: {
        validator: function (v) {
          return /^\d+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "Phone number is required"],
    },
    total: {
      type: Number,
      required: [true, "Total price is required"],
    },
  },
  { timestamps: true }
);

export const reservationModel = model("reservation", reservationSchema);
