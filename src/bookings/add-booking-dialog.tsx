import { Booking } from "@/history/columns";
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
import { Stock } from "@/stock/columns";
import { ListPlus } from "lucide-react";

interface AddBookingFormProps {
  onAddBooking: (newBooking: Booking) => void;
  row: Stock;
}

const formSchema = z
  .object({
    itemName: z.string().optional(),
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
  row,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: row.itemName || "",
      bookingDate: new Date(),
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function onSubmit() {
    const newBooking: Booking = {
      ...form,
      id: 0,
      itemName: row.itemName,
      quantity: 1,
      bookingDate: new Date().toISOString(),
      startDate: new Date(form.getValues("startDate")).toISOString(),
      endDate: new Date(form.getValues("endDate")).toISOString(),
    };
    onAddBooking(newBooking);
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <ListPlus className="h-4 w-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dodawanie rezerwacji</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="itemName"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa sprzętu</FormLabel>
                  <FormControl>
                    <Input placeholder="Nazwa sprzętu" {...field} />
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
