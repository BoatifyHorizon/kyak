import React, { useState } from "react";
import Layout from "../layout";
import { bookingsMockData } from "@/mocks/booking/bookings-mock-data";
import { Booking, columns } from "@/history/columns";
import { DataTable } from "../ui/data-table";
import { SearchBox } from "@/bookings/search-box";
import moment from "moment";
import { Separator } from "../ui/separator";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";

function getData(): Booking[] {
  // TODO: retrieving data using API

  return bookingsMockData.map((booking) => ({
    ...booking,
    startDate: moment(booking.startDate).format("DD.MM.YYYY HH:mm"),
    endDate: moment(booking.endDate).format("DD.MM.YYYY HH:mm"),
  }));
}

const HistoryPage: React.FC = () => {
  const auth = useAuth();
  if (auth.token === "") return <Navigate to="/login" />;

  const [data, setData] = useState<Booking[]>(getData());
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = getData().filter((booking) =>
        booking.itemName.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(getData());
    }
  };

  return (
    <Layout>
      <div className="text-xl font-medium tracking-wide px-3">
        Historia rezerwacji
      </div>
      <Separator className="w-full my-3" />
      <div className="flex justify-between mb-4">
        <div>
          <SearchBox
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Wyszukaj po nazwie..."
          />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </Layout>
  );
};

export default HistoryPage;
