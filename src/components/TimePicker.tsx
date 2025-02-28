
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TimePickerProps {
  setTime: (time: string) => void;
  time: string;
}

const TimePickerDemo = ({ setTime, time }: TimePickerProps) => {
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);
  const hourOptions = Array.from({ length: 24 }, (_, i) => i);

  const [hour, minute] = time.split(":").map(Number);

  const handleHourChange = (hour: number) => {
    setTime(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
  };

  const handleMinuteChange = (minute: number) => {
    setTime(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[60px] flex justify-center">
          <Clock />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="flex">
          <div className="flex flex-col p-2">
            <div className="text-center text-sm font-medium">Hour</div>
            <div className="h-[200px] overflow-y-auto">
              {hourOptions.map((h) => (
                <div
                  key={h}
                  className={cn(
                    "cursor-pointer rounded px-3 py-2 text-center text-sm",
                    hour === h ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  )}
                  onClick={() => handleHourChange(h)}
                >
                  {h.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col p-2">
            <div className="text-center text-sm font-medium">Minute</div>
            <div className="h-[200px] overflow-y-auto">
              {minuteOptions.map((m) => (
                <div
                  key={m}
                  className={cn(
                    "cursor-pointer rounded px-3 py-2 text-center text-sm",
                    minute === m ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  )}
                  onClick={() => handleMinuteChange(m)}
                >
                  {m.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

function Clock() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export { TimePickerDemo };
