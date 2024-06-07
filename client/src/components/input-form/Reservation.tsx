import { FC } from "react";
import InputCard from "@/components/InputCard";
import Form from "@/components/ui/form";
import { InputCardProps } from "@/routes";
import useQueryParams from "@/hooks/useQueryParams";
import InputField from "../InputField";

const Reservation: FC<InputCardProps> = ({ control, loading }) => {
  const queryParams = useQueryParams();
  return (
    <InputCard title="Reservation Details">
      <Form.field
        control={control}
        name="reservationId"
        render={({ field }) => (
          <InputField
            type="text"
            label="Reservation ID"
            placeholder="Reservation Id"
            {...field}
            onChange={(e) => {
              queryParams("reservationId", e.target.value);
              field.onChange(e);
            }}
            disabled={loading}
            required
          />
        )}
      />
      <Form.field
        control={control}
        name="pickupDate"
        render={({ field }) => (
          <InputField
            className="cursor-pointer"
            type="datetime-local"
            label="Pickup Date"
            {...field}
            onChange={(e) => {
              queryParams("pickupDate", e.target.value);
              field.onChange(e);
            }}
            disabled={loading}
            required
          />
        )}
      />
      <Form.field
        control={control}
        name="returnDate"
        render={({ field }) => (
          <InputField
            className="cursor-pointer"
            type="datetime-local"
            label="Return Date"
            {...field}
            onChange={(e) => {
              queryParams("returnDate", e.target.value);
              field.onChange(e);
            }}
            disabled={loading}
            required
          />
        )}
      />
      <Form.field
        control={control}
        name="durationDisplay"
        render={({ field }) => (
          <InputField
            type="text"
            label="Duration"
            placeholder="Duration of rental"
            {...field}
            disabled={true}
            readOnly
          />
        )}
      />
      <Form.field
        control={control}
        name="discount"
        render={({ field }) => (
          <InputField
            type="text"
            label="Discount"
            placeholder="Discount"
            {...field}
            disabled={true}
            readOnly
          />
        )}
      />
    </InputCard>
  );
};

export default Reservation;
