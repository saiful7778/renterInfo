import { FC } from "react";
import InputCard from "@/components/InputCard";

interface AdditionalProps {
  features?: string[] | null;
}

const Additional: FC<AdditionalProps> = ({ features }) => {
  return (
    <InputCard title="Additional Charges" showAccrodion>
      {features?.map((ele, idx) => (
        <div className="p-2" key={`features-${idx}`}>
          {ele}
        </div>
      ))}
    </InputCard>
  );
};

export default Additional;
