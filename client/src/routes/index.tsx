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
import { useEffect, useLayoutEffect, useState } from "react";
import Accordion from "@/components/ui/accordion";
import useQueryParams from "@/hooks/useQueryParams";
import getTimeDuration from "@/lib/getTimeDuration";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    reservationId: search.reservationId as string,
    pickupDate: search.pickupDate as string,
    returnDate: search.returnDate as string,
    duration: search.duration as string,
    durationDisplay: search.durationDisplay as string,
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

type allDataTypes = {
  id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  seats: number;
  bags: number;
  features: string[];
  rates: {
    hourly: number;
    daily: number;
    weekly: number;
  };
  imageURL: string;
};

function Index() {
  const {
    reservationId,
    pickupDate,
    returnDate,
    duration,
    durationDisplay,
    discount,
    vehicleType,
    vehicle,
    firstName,
    lastName,
    email,
    phone,
  } = Route.useSearch();
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [allVehicleType, setAllVehicleType] = useState<string[]>([]);
  const [allVehicleData, setAllVehicleData] = useState<allDataTypes[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<allDataTypes>({
    id: "",
    make: "",
    model: "",
    year: 0,
    type: "",
    seats: 0,
    bags: 0,
    features: [],
    rates: {
      hourly: 0,
      daily: 0,
      weekly: 0,
    },
    imageURL: "",
  });
  const [total, setTotal] = useState(0);
  const queryParams = useQueryParams();

  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      reservationId: reservationId || "00001",
      pickupDate: pickupDate || "",
      returnDate: returnDate || "",
      duration: duration || "",
      durationDisplay: durationDisplay || "",
      discount: discount || "",
      vehicleType: vehicleType || "",
      vehicle: vehicle || "",
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      phone: phone || "",
    },
  });

  const vehicleTypeValue = form.watch("vehicleType");
  const vehicleValue = form.watch("vehicle");
  const pickupDateValue = form.watch("pickupDate");
  const durationDisplayValue = form.watch("durationDisplay");
  const returnDateValue = form.watch("returnDate");

  useLayoutEffect(() => {
    (async () => {
      try {
        setIsError(null);
        const res = await fetch(
          "https://exam-server-7c41747804bf.herokuapp.com/carsList"
        );
        const data: { status: string; data: allDataTypes[] } = await res.json();
        if (data.status !== "success") {
          throw new Error();
        }
        setAllVehicleData([]);
        setAllVehicleType([]);
        if (data && data?.data?.length > 0) {
          setAllVehicleData(data.data);
          for (const x of data.data) {
            setAllVehicleType((props) => [...new Set([...props, x.type])]);
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          setIsError(err.message);
        }
      }
    })();
  }, [vehicleValue]);

  useEffect(() => {
    setSelectedVehicle((props) => ({
      ...props,
      ...allVehicleData.find(
        (ele) =>
          ele.make === vehicleValue.split(", ")[0] &&
          ele.model === vehicleValue.split(", ")[1]
      ),
    }));
  }, [vehicleValue, allVehicleData, durationDisplayValue]);

  useEffect(() => {
    const rates = selectedVehicle?.rates;
    const time = durationDisplayValue.replace(/\D/g, "").split("").reverse();

    let totalPrice = 0;

    if (time[0]) {
      totalPrice += parseFloat(time[0]) * rates?.hourly;
    }
    if (time[1]) {
      totalPrice += parseFloat(time[1]) * rates?.daily;
    }
    if (time[2]) {
      totalPrice += parseFloat(time[2]) * rates?.weekly;
    }
    setTotal(totalPrice);
  }, [selectedVehicle, durationDisplayValue]);

  useEffect(() => {
    const { duration, durationDisplay } = getTimeDuration(
      pickupDateValue,
      returnDateValue
    );
    queryParams("duration", duration);
    queryParams("durationDisplay", durationDisplay);

    form.setValue("duration", String(duration));
    form.setValue("durationDisplay", String(durationDisplay));
    return () => {};
  }, [pickupDateValue, returnDateValue, queryParams, form]);

  const handleSubmit = async (e: z.infer<typeof reservationSchema>) => {
    setLoading(true);
    const data = {
      reservationId: e.reservationId,
      pickupDate: e.pickupDate,
      returnDate: e.returnDate,
      duration: parseFloat(e.duration),
      discount: parseFloat(e.discount || "0"),
      vehicleType: e.vehicleType,
      vehicle: {
        make: selectedVehicle.make,
        model: selectedVehicle.model,
      },
      firstName: e.firstName,
      lastName: e.lastName,
      email: e.email,
      phone: e.phone,
      total,
    };
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
          <div className="flex gap-4 flex-wrap justify-between">
            <div className="w-full max-w-xs md:max-w-sm">
              <Reservation control={form.control} loading={loading} />
              <Vehicle
                control={form.control}
                loading={loading}
                isError={isError}
                allVehicleType={allVehicleType}
                allVehicle={allVehicleData
                  .filter((ele) => ele.type === vehicleTypeValue && ele.type)
                  .map((ele) => `${ele.make}, ${ele.model}`)}
              />
            </div>
            <div className="w-full max-w-xs md:max-w-sm">
              <Customer control={form.control} loading={loading} />
              <Additional features={selectedVehicle.features} />
            </div>
            <div className="w-full max-w-xs md:max-w-sm">
              <Charges rates={selectedVehicle.rates} total={total} />
              {selectedVehicle && (
                <img
                  src={selectedVehicle.imageURL}
                  alt={`${selectedVehicle.make} ${selectedVehicle.model} image`}
                />
              )}
            </div>
          </div>
        </Accordion>
      </form>
    </Form>
  );
}
