import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import ReservationForm from "@/pages/ReservationForm";
import { Loading } from "@/components/Loading";

export type allvehicleDataTypes = {
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

export type defaultValueTypes = {
  reservationId?: string;
  pickupDate?: string;
  returnDate?: string;
  duration?: number;
  durationDisplay?: string;
  discount?: number;
  vehicleType?: string;
  vehicle?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): defaultValueTypes => ({
    reservationId: search.reservationId as string | undefined,
    pickupDate: search.pickupDate as string | undefined,
    returnDate: search.returnDate as string | undefined,
    duration: search.duration as number | undefined,
    durationDisplay: search.durationDisplay as string | undefined,
    discount: search.discount as number | undefined,
    vehicleType: search.vehicleType as string | undefined,
    vehicle: search.vehicle as string | undefined,
    firstName: search.firstName as string | undefined,
    lastName: search.lastName as string | undefined,
    email: search.email as string | undefined,
    phone: search.phone as string | undefined,
  }),
  component: Index,
});

function Index() {
  const {
    reservationId: reservationIdValue,
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

  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reservationId, setReservationId] = useState<string | undefined>(
    reservationIdValue
  );
  const [vehiclesData, setVehiclesData] = useState<allvehicleDataTypes[]>([]);
  const navigate = Route.useNavigate();

  const handleQueryParams = useCallback(
    (key: string, value: string | number | undefined) => {
      navigate({ search: (props) => ({ ...props, [key]: value }) });
    },
    [navigate]
  );

  /**
   * Get server datas
   */
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(null);
        const vehicleListRes = await fetch(
          "https://exam-server-7c41747804bf.herokuapp.com/carsList"
        );
        const vehicleListData: {
          status?: string;
          data: allvehicleDataTypes[];
        } = await vehicleListRes.json();

        if (vehicleListData?.status !== "success") {
          throw new Error("Vehicle list cannot get");
        }

        if (!reservationIdValue) {
          const reservationIdRes = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/reservation`
          );

          const reservationIdData: {
            success?: boolean;
            data?: { reservationId: string };
          } = await reservationIdRes.json();

          if (!reservationIdData?.success) {
            throw new Error("reservation id cannot get");
          }
          setReservationId(reservationIdData?.data?.reservationId);
        }
        setVehiclesData(vehicleListData?.data);
      } catch (err) {
        if (err instanceof Error) {
          setIsError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [reservationIdValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleQueryParams("reservationId", reservationId);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [handleQueryParams, reservationId]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center font-bold text-destructive text-xl">
        {isError}
      </div>
    );
  }

  return (
    <ReservationForm
      navigate={navigate}
      handleQueryParams={handleQueryParams}
      vehiclesData={vehiclesData}
      defaultValues={{
        reservationId,
        pickupDate: pickupDate || "",
        returnDate: returnDate || "",
        duration: duration || 0,
        durationDisplay: durationDisplay || "",
        discount: discount || 0,
        vehicleType: vehicleType || "",
        vehicle: vehicle || "",
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        phone: phone || "",
      }}
    />
  );
}
