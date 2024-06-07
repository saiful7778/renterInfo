import { FC, ReactNode, useId } from "react";
import Separator from "./ui/separator";
import Accordion from "./ui/accordion";

interface InputCardProps {
  title: string;
  children: ReactNode;
  showAccrodion?: boolean;
}

const InputCard: FC<InputCardProps> = ({ title, children, showAccrodion }) => {
  const accrodionId = useId();
  return (
    <div className="w-full max-w-sm">
      {showAccrodion ? (
        <Accordion.item value={accrodionId}>
          <Accordion.trigger className="font-semibold text-lg">
            {title}
          </Accordion.trigger>
          <Separator />
          <Accordion.content className="p-4 space-y-2">
            {children}
          </Accordion.content>
        </Accordion.item>
      ) : (
        <>
          <h3 className="font-semibold text-lg my-4">{title}</h3>
          <Separator />
          <div className="p-4 space-y-2">{children}</div>
        </>
      )}
    </div>
  );
};

export default InputCard;
