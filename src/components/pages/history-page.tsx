import { SearchBox } from "@/bookings/search-box";
import { BACKEND_ADDRESS, BOOKING_HISTORY, USERS_JWT } from "@/connection/api-config";
import { ProfileData } from "@/connection/profile";
import { Booking, columns } from "@/history/columns";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layout";
import { useAuth } from "../providers/auth-provider";
import { DataTable } from "../ui/data-table";
import { Separator } from "../ui/separator";

async function getHistoryData(): Promise<Booking[] | false> {
  const jwt = localStorage.getItem("jwt");
  try {
    const profile: AxiosResponse<ProfileData> = await axios.post(BACKEND_ADDRESS + USERS_JWT, jwt);

    if (profile.status >= 400) {
      return false;
    }

    const lodki = await axios.get(BACKEND_ADDRESS + BOOKING_HISTORY + "/" + profile.data.email);

    return lodki.data;
  } catch (error) {
    return false;
  }
}

const HistoryPage: React.FC = () => {
  const auth = useAuth();
  if (auth.token === "") return <Navigate to="/login" />;

  const historyQuery = useQuery({
    queryKey: ["historyData"],
    queryFn: getHistoryData,
  });
  if (historyQuery.data === false) return <Navigate to="/login" />;

  const [data, setData] = useState<Booking[]>(historyQuery.data ?? []);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = data.filter((booking) => booking.itemName.toLowerCase().includes(query.toLowerCase()));
      setData(filteredData);
    }
  };

  return (
    <Layout>
      <div className="text-xl font-medium tracking-wide px-3">Historia rezerwacji</div>
      <Separator className="w-full my-3" />
      <div className="flex justify-between mb-4">
        <div>
          <SearchBox value={searchQuery} onChange={handleSearch} placeholder="Wyszukaj po nazwie..." />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </Layout>
  );
};

export default HistoryPage;
