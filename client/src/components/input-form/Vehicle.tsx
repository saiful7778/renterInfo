import { FC } from "react";
import InputCard from "@/components/InputCard";
import CommandInput from "@/components/CommandInput";
import { InputCardProps } from "@/pages/ReservationForm";
import Form from "../ui/form";
import useReservationQueryParams from "@/hooks/useReservationQueryParams";

interface VehicleProps extends InputCardProps {
  vehicleType: string[];
  vehicleData: string[];
}

const Vehicle: FC<VehicleProps> = ({
  control,
  loading,
  vehicleType,
  vehicleData,
}) => {
  const { handleQueryParams } = useReservationQueryParams();
  return (
    <InputCard title="Vehicle Information">
      <Form.field
        control={control}
        name="vehicleType"
        render={({ field }) => (
          <CommandInput
            label="Vehicle Type"
            placeholder="Select vehicle type"
            searchPlaceholder="Search vehicle type"
            data={vehicleType}
            onChange={(e: string) => {
              handleQueryParams("vehicleType", e);
              field.onChange(e);
            }}
            value={field.value}
            loading={loading}
            required
          />
        )}
      />
      <Form.field
        control={control}
        name="vehicle"
        render={({ field }) => (
          <CommandInput
            label="Vehicle"
            placeholder="Select vehicle"
            searchPlaceholder="Search vehicle"
            data={vehicleData}
            onChange={(e: string) => {
              handleQueryParams("vehicle", e);
              field.onChange(e);
            }}
            value={field.value}
            loading={loading}
            required
          />
        )}
      />
    </InputCard>
  );
};

export default Vehicle;
