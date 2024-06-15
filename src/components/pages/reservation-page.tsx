import React, { useState } from "react";
import Layout from "../layout";
import { bookingsMockData } from "@/mocks/booking/bookings-mock-data";
import { Booking, columns } from "@/bookings/columns";
import { DataTable } from "../ui/data-table";
import { AddBookingDialog } from "@/bookings/add-booking-dialog";

function getData(): Booking[] {
  // TODO: retrieving data using API
  return bookingsMockData;
}

const ReservationPage: React.FC = () => {
  const [data, setData] = useState<Booking[]>(getData());

  const handleAddBooking = (newBooking: Booking) => {
    const maxId = Math.max(...data.map((booking) => booking.id));
    newBooking.id = maxId + 1;
    setData((prevData) => [...prevData, newBooking]);
  };

  return (
    <Layout>
      {/* <DataTable columns={columns} data={data} /> */}
      <AddBookingDialog onAddBooking={handleAddBooking} />
    </Layout>
  );
};

export default ReservationPage;
