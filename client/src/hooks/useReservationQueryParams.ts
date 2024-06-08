import { ReservationContext } from "@/pages/ReservationForm";
import { useContext } from "react";

export default function useReservationQueryParams() {
  const context = useContext(ReservationContext);
  if (context === null) {
    throw new Error("Error in useReservationQueryParams");
  }
  return context;
}
