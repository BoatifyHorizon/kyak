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
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/ui/date-picker";

interface AddBookingFormProps {
  onAddBooking: (newBooking: Booking) => void;
  onClose: () => void;
}

const formSchema = z
  .object({
    name: z.string().min(1),
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

export const AddBookingForm: React.FC<AddBookingFormProps> = ({
  onAddBooking,
  onClose,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bookingDate: new Date(),
    },
  });

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
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-black"
      >
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
                <DatePicker text="Wybierz datę początkową" field={field} />
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
                <DatePicker text="Wybierz datę końcową" field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Zamknij
          </Button>
          <Button type="submit">Potwierdź</Button>
        </div>
      </form>
    </Form>
  );
};
