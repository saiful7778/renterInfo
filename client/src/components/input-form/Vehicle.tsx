import { FC } from "react";
import InputCard from "@/components/InputCard";
import CommandInput from "@/components/CommandInput";
import { InputCardProps } from "@/routes";
import Form from "../ui/form";

const Vehicle: FC<InputCardProps> = ({ control, loading }) => {
  const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

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
            data={frameworks}
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
            data={frameworks}
            name="vehicle"
            onChange={field.onChange}
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
