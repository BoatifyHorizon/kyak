import { Booking } from "@/bookings/columns";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AddBookingFormProps {
  onAddBooking: (newBooking: Booking) => void;
}

const formSchema = z
  .object({
    name: z.string(),
    bookingDate: z.date(),
    startDate: z.date().refine((data) => data > new Date(), {
      message: "Błędna data początkowa",
    }),
    endDate: z.date(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "Data końcowa musi być późniejsza niż data początkowa",
    path: ["endDate"],
  });

export const AddBookingDialog: React.FC<AddBookingFormProps> = ({
  onAddBooking,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bookingDate: new Date(),
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(form.getValues("startDate"));
    const newBooking: Booking = {
      ...form,
      id: 0,
      name: form.getValues("name"),
      bookingDate: new Date(),
      startDate: new Date(form.getValues("startDate")),
      endDate: new Date(form.getValues("endDate")),
    };
    onAddBooking(newBooking);
    console.log(values);
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Dodaj rezerwację</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dodawanie rezerwacji</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input placeholder="Imię" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data początkowa</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      text="Wybierz datę początkową"
                      field={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data końcowa</FormLabel>
                  <FormControl>
                    <DateTimePicker text="Wybierz datę końcową" field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Potwierdź</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
