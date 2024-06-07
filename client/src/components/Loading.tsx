import { FC } from "react";
import { ImSpinner9 } from "react-icons/im";

export const LoadingFullPage: FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <span role="status">
        <ImSpinner9 className="animate-spinner" size={60} />
      </span>
    </div>
  );
};

export const Loading: FC = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <span role="status">
        <ImSpinner9 className="animate-spinner" size={60} />
      </span>
    </div>
  );
};
