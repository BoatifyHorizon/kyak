import React, { useState } from "react";
import Layout from "../layout";
import { stockMockData } from "@/mocks/stock/stock-mock-data";
import { bookingsMockData } from "@/mocks/booking/bookings-mock-data";
import { DataTable } from "../ui/data-table";
import { AddBookingDialog } from "@/bookings/add-booking-dialog";
import { Booking } from "@/history/columns";
import { Stock } from "@/stock/columns";
import { Separator } from "../ui/separator";
import { useAuth } from "../providers/auth-provider";
import { Navigate } from "react-router-dom";

function getStockData(): Stock[] {
  // TODO: retrieving data using API
  return stockMockData;
}

function getBookingData(): Booking[] {
  // TODO: retrieving data using API
  return bookingsMockData;
}

const ReservationPage: React.FC = () => {
  const auth = useAuth();
  if (auth.token === "") return <Navigate to="/login" />;

  const [stockData] = useState<Stock[]>(getStockData());
  const [bookingData, setBookingData] = useState<Booking[]>(getBookingData());

  const handleAddBooking = (newBooking: Booking) => {
    const maxId = Math.max(...bookingData.map((booking) => booking.id), 0);
    newBooking.id = maxId + 1;
    setBookingData((prevData) => [...prevData, newBooking]);
  };

  const columns = [
    {
      id: "actions",
      cell: ({ row }: { row: any }) => {
        const selectedRow = row.original;
        return (
          <AddBookingDialog onAddBooking={handleAddBooking} row={selectedRow} />
        );
      },
    },
    {
      accessorKey: "itemName",
      header: "Nazwa sprzętu",
    },
    {
      accessorKey: "quantity",
      header: "Liczba dostępnych",
    },
  ];

  return (
    <Layout>
      <div className="text-xl font-medium tracking-wide px-3">
        Rezerwacje
      </div>
      <Separator className="w-full my-3" />
      <DataTable columns={columns} data={stockData} />
    </Layout>
  );
};

export default ReservationPage;
