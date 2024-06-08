import Additional from "@/components/input-form/Additional";
import Charges from "@/components/input-form/Charges";
import Customer from "@/components/input-form/Customer";
import Reservation from "@/components/input-form/Reservation";
import Vehicle from "@/components/input-form/Vehicle";
import Accordion from "@/components/ui/accordion";
import Button from "@/components/ui/button";
import Form from "@/components/ui/form";
import getTimeDuration from "@/lib/getTimeDuration";
import { reservationSchema } from "@/lib/schemas/reservation";
import { allvehicleDataTypes, defaultValueTypes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseNavigateResult } from "@tanstack/react-router";
import { FC, useState, createContext, useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";

export interface InputCardProps {
  control: Control<z.infer<typeof reservationSchema>>;
  loading: boolean;
}

interface ReservationContextProps {
  handleQueryParams: (key: string, value: string | number | undefined) => void;
}

export const ReservationContext = createContext<ReservationContextProps | null>(
  null
);

interface ReservationFormProps extends ReservationContextProps {
  defaultValues: defaultValueTypes;
  navigate: UseNavigateResult<string>;
  vehiclesData: allvehicleDataTypes[];
}

const ReservationForm: FC<ReservationFormProps> = ({
  defaultValues,
  handleQueryParams,
  navigate,
  vehiclesData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues,
  });
  const [selectedVehicle, setSelectedVehicle] =
    useState<allvehicleDataTypes | null>(null);

  const vehicleTypeValue = form.watch("vehicleType");
  const vehicleValue = form.watch("vehicle");
  const pickupDateValue = form.watch("pickupDate");
  const durationDisplayValue = form.watch("durationDisplay");
  const returnDateValue = form.watch("returnDate");

  /**
   * calculation the reservation duration time
   */
  useEffect(() => {
    const { duration, durationDisplay } = getTimeDuration(
      pickupDateValue,
      returnDateValue
    );
    handleQueryParams("duration", duration);
    handleQueryParams("durationDisplay", durationDisplay);

    form.setValue("duration", duration);
    form.setValue("durationDisplay", String(durationDisplay));
  }, [pickupDateValue, returnDateValue, handleQueryParams, form]);

  /**
   * calculation the total price
   */
  useEffect(() => {
    if (selectedVehicle) {
      const rates = selectedVehicle.rates;
      const { hourly, daily, weekly } = rates;

      const time = durationDisplayValue
        .replace(/\D/g, " ")
        .split(" ")
        .filter((ele) => ele)
        .reverse();

      let totalPrice = 0;

      if (time[0]) {
        if (parseFloat(time[0]) * hourly > daily) {
          totalPrice += rates!.daily!;
        } else {
          totalPrice += parseFloat(time[0]) * hourly;
        }
      }
      if (time[1]) {
        totalPrice += parseFloat(time[1]) * daily;
      }
      if (time[2]) {
        totalPrice += parseFloat(time[2]) * weekly;
      }
      setTotal(totalPrice);
    }
  }, [selectedVehicle, durationDisplayValue]);

  /**
   * store the selected vehicle
   */
  useEffect(() => {
    if (vehicleValue && vehiclesData) {
      const vehicleValueArr = vehicleValue?.split(", ");
      setSelectedVehicle(
        () =>
          vehiclesData.find(
            (ele) =>
              ele.make === vehicleValueArr[0] &&
              ele.model === vehicleValueArr[1]
          )!
      );
    }
  }, [vehicleValue, vehiclesData]);

  const handleSubmit = async (e: z.infer<typeof reservationSchema>) => {
    setLoading(true);
    setIsError(null);
    try {
      if (!selectedVehicle) return;
      const data = {
        reservationId: e.reservationId,
        pickupDate: e.pickupDate,
        returnDate: e.returnDate,
        duration: e.duration,
        discount: e.discount,
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
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/reservation`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const resData = await res.json();
      if (!resData?.success) {
        throw new Error("Reservation cannot created");
      }
      navigate({ search: {} });
      form.reset({});
      setSelectedVehicle(null);
    } catch (err) {
      if (err instanceof Error) {
        setIsError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReservationContext.Provider value={{ handleQueryParams }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex items-center gap-2 justify-between">
            <h2 className="font-bold text-2xl">Reservation</h2>
            <Button type="submit" disabled={loading}>
              Print / Download
            </Button>
          </div>
          {isError && (
            <div className="text-center font-bold text-destructive text-xl">
              {isError}
            </div>
          )}
          <Accordion type="multiple" className="my-4">
            <div className="flex gap-4 flex-wrap justify-between">
              <div className="w-full max-w-xs md:max-w-sm">
                <Reservation control={form.control} loading={loading} />
                <Vehicle
                  control={form.control}
                  loading={loading}
                  vehicleType={[
                    ...new Set(vehiclesData.map((ele) => ele.type)),
                  ]}
                  vehicleData={vehiclesData
                    .filter((ele) => ele.type === vehicleTypeValue && ele.type)
                    .map((ele) => `${ele.make}, ${ele.model}`)}
                />
              </div>
              <div className="w-full max-w-xs md:max-w-sm">
                <Customer control={form.control} loading={loading} />
                <Additional features={selectedVehicle?.features} />
              </div>
              <div className="w-full max-w-xs md:max-w-sm">
                <Charges rates={selectedVehicle?.rates} total={total} />
                {selectedVehicle?.imageURL && (
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
    </ReservationContext.Provider>
  );
};

export default ReservationForm;
