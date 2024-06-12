import { ColumnDef } from "@tanstack/react-table";

export type Booking = {
  id: number;
  name: string;
  bookingDate: Date;
  startDate: Date;
  endDate: Date;
};

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "bookingDate",
    header: "BookingDate",
  },
  {
    accessorKey: "startDate",
    header: "StartDate",
  },
  {
    accessorKey: "endDate",
    header: "EndDate",
  },
];
