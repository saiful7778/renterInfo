import { FC } from "react";
import InputCard from "@/components/InputCard";
import CommandInput from "@/components/CommandInput";
import { InputCardProps } from "@/routes";
import Form from "../ui/form";

interface VehicleProps extends InputCardProps {
  isError?: string | null;
  allVehicleType: string[];
  allVehicle: string[];
}

const Vehicle: FC<VehicleProps> = ({
  control,
  loading,
  isError,
  allVehicleType,
  allVehicle,
}) => {
  return (
    <InputCard title="Vehicle Information">
      {isError ? (
        <div className="text-center text-destructive">Something went wrong</div>
      ) : (
        <>
          <Form.field
            control={control}
            name="vehicleType"
            render={({ field }) => (
              <CommandInput
                label="Vehicle Type"
                placeholder="Select vehicle type"
                searchPlaceholder="Search vehicle type"
                data={allVehicleType}
                name="vehicleType"
                onChange={field.onChange}
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
                data={allVehicle}
                name="vehicle"
                onChange={field.onChange}
                value={field.value}
                loading={loading}
                required
              />
            )}
          />
        </>
      )}
    </InputCard>
  );
};

export default Vehicle;
