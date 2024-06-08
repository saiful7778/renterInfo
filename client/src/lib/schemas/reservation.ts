import * as z from "zod";

export const reservationSchema = z.object({
  reservationId: z
    .string({
      required_error: "Reservation ID is required",
    })
    .min(5, "Reservation ID is required"),
  pickupDate: z
    .string({ required_error: "Pick up date is required" })
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid date and time",
    }),
  returnDate: z
    .string({ required_error: "Return date is required" })
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid date and time",
    }),
  duration: z.number({ required_error: "Duration is required" }),
  durationDisplay: z.string({ required_error: "Duration is required" }),
  discount: z.number().optional(),
  vehicleType: z
    .string({ required_error: "Vehicle Type is required" })
    .min(1, "Vehicle Type is required"),
  vehicle: z
    .string({ required_error: "Vehicle is required" })
    .min(1, "Vehicle is required"),
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "Minimum one character required"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Minimum one character required"),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(11, "Phone number must be in 11 numbers")
    .max(11, "Phone number must be in 11 numbers"),
});
