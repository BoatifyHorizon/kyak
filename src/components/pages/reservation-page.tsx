import React, { useState } from "react";
import Layout from "../layout";
import { bookingsMockData } from "@/mocks/booking/bookings-mock-data";
import { Booking, columns } from "@/bookings/columns";
import { DataTable } from "../ui/data-table";
import { Modal } from "../ui/modal";
import { SearchBox } from "@/bookings/search-box";
import { AddBookingForm } from "@/bookings/add-booking-form";
import { Button } from "@/components/ui/button";

function getData(): Booking[] {
  // TODO: retrieving data using API
  return bookingsMockData;
}

const ReservationPage: React.FC = () => {
  const [data, setData] = useState<Booking[]>(getData());
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = getData().filter((booking) =>
        booking.name.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(getData());
    }
  };

  const handleAddBooking = (newBooking: Booking) => {
    const maxId = Math.max(...data.map((booking) => booking.id));
    newBooking.id = maxId + 1;
    setData((prevData) => [...prevData, newBooking]);
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <div>
          <SearchBox value={searchQuery} onChange={handleSearch} />
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Dodaj rezerwację</Button>
      </div>
      <DataTable columns={columns} data={data} />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <AddBookingForm
            onAddBooking={handleAddBooking}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default ReservationPage;
