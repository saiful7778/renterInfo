import Button from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import Customer from "@/components/input-form/Customer";
import Reservation from "@/components/input-form/Reservation";
import Vehicle from "@/components/input-form/Vehicle";
import Additional from "@/components/input-form/Additional";
import Charges from "@/components/input-form/Charges";
import Form from "@/components/ui/form";
import { type Control, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema } from "@/lib/schemas/reservation";
import { useEffect, useState } from "react";
import Accordion from "@/components/ui/accordion";
import useQueryParams from "@/hooks/useQueryParams";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    reservationId: search.reservationId as string,
    pickupDate: search.pickupDate as string,
    returnDate: search.returnDate as string,
    duration: search.duration as string,
    discount: search.discount as string,
    vehicleType: search.vehicleType as string,
    vehicle: search.vehicle as string,
    firstName: search.firstName as string,
    lastName: search.lastName as string,
    email: search.email as string,
    phone: search.phone as string,
  }),
  component: Index,
});

export interface InputCardProps {
  control: Control<z.infer<typeof reservationSchema>>;
  loading: boolean;
}

function Index() {
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
  } = Route.useSearch();
  const [loading, setLoading] = useState<boolean>(false);
  const queryParams = useQueryParams();

  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      reservationId: reservationId || "00001",
      pickupDate: pickupDate || "",
      returnDate: returnDate || "",
      duration: duration || "",
      durationDisplay: duration || "",
      discount: discount || "",
      vehicleType: vehicleType || "",
      vehicle: vehicle || "",
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      phone: phone || "",
    },
  });

  const pickupDateValue = form.watch("pickupDate");
  const returnDateValue = form.watch("returnDate");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = new Date(pickupDateValue);
      const end = new Date(returnDateValue);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

      const duration = end.getTime() - start.getTime();

      const oneDay = 1000 * 60 * 60 * 24;

      const weeks = Math.floor(duration / (oneDay * 7));
      const days = Math.floor((duration % (oneDay * 7)) / oneDay);
      const hours = Math.floor((duration % oneDay) / (1000 * 60 * 60));

      let durationTime = "";

      if (weeks > 0) {
        durationTime += `${weeks}w ${days}d ${hours}h`;
      } else if (days > 0) {
        durationTime += `${days}d ${hours}h`;
      } else {
        durationTime += `${hours}h`;
      }
      queryParams("duration", duration);

      form.setValue("duration", String(duration));
      form.setValue("durationDisplay", String(durationTime));
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [pickupDateValue, returnDateValue, form, queryParams]);

  const handleSubmit = async (data: z.infer<typeof reservationSchema>) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex items-center gap-2 justify-between">
          <h2 className="font-bold text-2xl">Reservation</h2>
          <Button type="submit">Print / Download</Button>
        </div>
        <Accordion type="multiple" className="my-4">
          <div className="flex gap-4 flex-wrap">
            <div className="w-full max-w-sm">
              <Reservation control={form.control} loading={loading} />
              <Vehicle control={form.control} loading={loading} />
            </div>
            <div className="w-full max-w-sm">
              <Customer control={form.control} loading={loading} />
              <Additional />
            </div>
            <Charges />
          </div>
        </Accordion>
      </form>
    </Form>
  );
}
