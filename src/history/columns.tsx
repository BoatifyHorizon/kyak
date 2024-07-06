import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingResponse } from "@/components/pages/history-page";

export type Booking = {
  id: number;
  itemName: string;
  quantity: number;
  bookingDate: string;
  startDate: string;
  endDate: string;
};

export interface BookingRespQuan extends BookingResponse {
  quantity: 1;
}

const formatDate = (date: string) => { 
  const split = date.split("T");
  const dateT = split[0];
  const time = split[1].slice(0, 5);

  return `${dateT} ${time}`
 }

export const columns: ColumnDef<BookingRespQuan>[] = [
  {
    accessorKey: "equipmentName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nazwa sprzętu
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Liczba",
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Data początkowa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (date) => formatDate(`${date.getValue()}`)
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Data końcowa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (date) => formatDate(`${date.getValue()}`)
  },
];
