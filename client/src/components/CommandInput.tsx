import { FC, useState } from "react";
import Popover from "@/components/ui/popover";
import Button from "@/components/ui/button";
import Command from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Form from "./ui/form";
import useQueryParams from "@/hooks/useQueryParams";

interface CommandInputProps {
  label?: string;
  required?: boolean;
  name: string;
  placeholder?: string;
  searchPlaceholder?: string;
  onChange: (...event: unknown[]) => void;
  value: string;
  data: string[];
  loading?: boolean;
}

const CommandInput: FC<CommandInputProps> = ({
  label,
  required,
  placeholder,
  searchPlaceholder,
  onChange,
  value,
  name,
  data,
  loading,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value || "");
  const queryParams = useQueryParams();

  return (
    <>
      <Form.item>
        {label && (
          <Form.label>
            {label} {required && <span className="text-destructive">*</span>}
          </Form.label>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <Popover.trigger asChild>
            <Form.control>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                disabled={loading}
                className="w-full justify-between active:focus:scale-100"
              >
                {inputValue ? (
                  <span>{data.find((ele) => ele === inputValue)}</span>
                ) : (
                  placeholder && (
                    <span className="text-muted-foreground">{placeholder}</span>
                  )
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </Form.control>
          </Popover.trigger>
          <Popover.content className="p-0">
            <Command>
              <Command.input placeholder={searchPlaceholder} />
              <Command.list>
                <Command.empty>No Data found.</Command.empty>
                <Command.group>
                  {data.map((ele, idx) => (
                    <Command.item
                      key={`vechicle-type-search-${idx}`}
                      value={ele}
                      onSelect={(currentValue) => {
                        const currValue =
                          currentValue === inputValue ? "" : currentValue;
                        setInputValue(currValue);
                        queryParams(name, currValue);
                        onChange(currValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          inputValue === ele ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {ele}
                    </Command.item>
                  ))}
                </Command.group>
              </Command.list>
            </Command>
          </Popover.content>
        </Popover>
        <Form.message />
      </Form.item>
    </>
  );
};

export default CommandInput;
