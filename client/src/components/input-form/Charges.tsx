import { FC } from "react";
import InputCard from "@/components/InputCard";
import Separator from "../ui/separator";

interface ChargesProps {
  rates?: {
    daily: number;
    hourly: number;
    weekly: number;
  };
  total?: number;
}

const Charges: FC<ChargesProps> = ({ rates, total }) => {
  return (
    <InputCard title="Charges Summary">
      {rates && (
        <div className="p-4 rounded-md border border-primary bg-[#DFDFFF]">
          <div className="flex gap-2 font-semibold items-center my-2 mx-1">
            <span className="flex-1">Charge</span>
            <span className="max-w-14 text-center w-full">Unit</span>
            <span className="max-w-16 text-center w-full">Rate</span>
            <span className="max-w-14 text-center w-full">Total</span>
          </div>
          <Separator className="my-2" />
          <div className="flex gap-2 items-center my-2 mx-1">
            <span className="flex-1">Hourly</span>
            <span className="max-w-14 text-center w-full">1</span>
            <span className="max-w-16 text-center w-full">${rates.hourly}</span>
            <span className="max-w-14 text-center w-full">
              ${rates.hourly * 1}
            </span>
          </div>
          <div className="flex gap-2 items-center my-2 mx-1">
            <span className="flex-1">Daily</span>
            <span className="max-w-14 text-center w-full">1</span>
            <span className="max-w-16 text-center w-full">${rates.daily}</span>
            <span className="max-w-14 text-center w-full">
              ${rates.daily * 1}
            </span>
          </div>
          <div className="flex gap-2 items-center my-2 mx-1">
            <span className="flex-1">Weekly</span>
            <span className="max-w-14 text-center w-full">1</span>
            <span className="max-w-16 text-center w-full">${rates.weekly}</span>
            <span className="max-w-14 text-center w-full">
              ${rates.weekly * 1}
            </span>
          </div>
          <div className="flex font-semibold gap-4 items-center py-2 mt-6">
            <span className="flex-1">Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}
    </InputCard>
  );
};

export default Charges;
