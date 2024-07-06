import { SearchBox } from "@/bookings/search-box";
import { BACKEND_ADDRESS, BOOKING_HISTORY, USERS_JWT } from "@/connection/api-config";
import { ProfileData } from "@/connection/profile";
import { BookingRespQuan, columns } from "@/history/columns";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layout";
import { useAuth } from "../providers/auth-provider";
import { DataTable } from "../ui/data-table";
import { Separator } from "../ui/separator";

export interface BookingResponse {
  equipmentName: string;
  startDate: string;
  endDate: string;
}

async function getHistoryData(): Promise<BookingRespQuan[] | false> {
  const jwt = localStorage.getItem("jwt");
  try {
    const profile: AxiosResponse<ProfileData> = await axios.post(BACKEND_ADDRESS + USERS_JWT, jwt);

    if (profile.status >= 400) {
      return false;
    }

    const equipment: AxiosResponse<BookingResponse[]> = await axios.get(
      BACKEND_ADDRESS + BOOKING_HISTORY + "/" + profile.data.email
    );
    const eqToAdd: BookingRespQuan[] = equipment.data.map((e) => ({ ...e, quantity: 1 }));

    return eqToAdd;
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

  const [data, setData] = useState<BookingRespQuan[]>(historyQuery.data ?? []);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = data.filter((booking) => booking.equipmentName.toLowerCase().includes(query.toLowerCase()));
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
