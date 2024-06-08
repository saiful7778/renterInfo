import { FC } from "react";
import InputCard from "@/components/InputCard";
import { InputCardProps } from "@/pages/ReservationForm";
import Form from "@/components/ui/form";
import InputField from "@/components/InputField";
import useReservationQueryParams from "@/hooks/useReservationQueryParams";

const Customer: FC<InputCardProps> = ({ control, loading }) => {
  const { handleQueryParams } = useReservationQueryParams();
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
              handleQueryParams("firstName", e.target.value);
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
              handleQueryParams("lastName", e.target.value);
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
              handleQueryParams("email", e.target.value);
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
              handleQueryParams("phone", e.target.value);
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
