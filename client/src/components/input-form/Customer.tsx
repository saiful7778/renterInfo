import { FC } from "react";
import InputCard from "@/components/InputCard";
import { InputCardProps } from "@/routes";
import Form from "@/components/ui/form";
import InputField from "@/components/InputField";
import useQueryParams from "@/hooks/useQueryParams";

const Customer: FC<InputCardProps> = ({ control, loading }) => {
  const queryParams = useQueryParams();
  return (
    <InputCard title="Customer Information">
      <Form.field
        control={control}
        name="firstName"
        render={({ field }) => (
          <InputField
            type="text"
            label="First name"
            placeholder="First name"
            {...field}
            onChange={(e) => {
              queryParams("firstName", e.target.value);
              field.onChange(e);
            }}
            disabled={loading}
            required
          />
        )}
      />
      <Form.field
        control={control}
        name="lastName"
        render={({ field }) => (
          <InputField
            type="text"
            label="Last name"
            placeholder="Last name"
            {...field}
            onChange={(e) => {
              queryParams("lastName", e.target.value);
              field.onChange(e);
            }}
            disabled={loading}
            required
          />
        )}
      />
      <Form.field
        control={control}
        name="email"
        render={({ field }) => (
          <InputField
            type="email"
            label="Email"
            placeholder="Email address"
            {...field}
            onChange={(e) => {
              queryParams("email", e.target.value);
              field.onChange(e);
            }}
            disabled={loading}
            required
          />
        )}
      />
      <Form.field
        control={control}
        name="phone"
        render={({ field }) => (
          <InputField
            type="text"
            label="Phone"
            placeholder="Phone number"
            {...field}
            onChange={(e) => {
              queryParams("phone", e.target.value);
              field.onChange(e);
            }}
            disabled={loading}
            required
          />
        )}
      />
    </InputCard>
  );
};

export default Customer;
