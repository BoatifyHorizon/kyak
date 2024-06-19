import * as React from "react";
import moment from "moment";
import { Calendar as CalendarIcon, Clock, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "./input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateTimePickerProps {
  text: string;
  field: any;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ text, field }) => {
  const getNearestFullHour = () => {
    const now = moment();
    return now.add(1, 'hour').startOf('hour').format("HH:mm");
  };

  const [time, setTime] = useState(getNearestFullHour);
  const [showResetButton, setShowResetButton] = useState(false);

  useEffect(() => {
    if (field.value) {
      const currentDate = moment(field.value).format("HH:mm");
      const time = getNearestFullHour();
      setShowResetButton(currentDate !== time);
    }
  }, [time, field.value]);

  const handleTimeChange = (e: any) => {
    setTime(e.target.value);
    if (field.value) {
      const [hours, minutes] = e.target.value.split(":");
      const newDate = moment(field.value).set({ hours, minutes }).toDate();
      field.onChange(newDate);
    }
  };

  const handleDateSelect = (date: any) => {
    if (date) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = moment(date).set({ hours, minutes }).toDate();
      field.onChange(newDate);
    }
  };

  const handleTimeReset = () => {
    const now = moment();
    const nearestHour = getNearestFullHour();
    setTime(nearestHour);
    const [hours, minutes] = nearestHour.split(":").map(Number);
    const newDate = now.set({ hours, minutes }).toDate();
    field.onChange(newDate);
    setShowResetButton(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? (
            moment(field.value).format("DD.MM.YYYY HH:mm")
          ) : (
            <span>{text}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={handleDateSelect}
          initialFocus
        />
        <div className="flex items-center mb-4">
          <Clock className="ml-4 mr-2 h-4 w-4" />
          <Input
            type="time"
            className="w-max py-4"
            value={time}
            onChange={handleTimeChange}
          />
          {showResetButton && (
            <Button onClick={handleTimeReset} className="rounded" >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { DateTimePicker };
