import { AddBookingDialog } from "@/bookings/add-booking-dialog";
import { BACKEND_ADDRESS, BOOKING_ADD, EQUIPMENT_ALL, USERS_JWT } from "@/connection/api-config";
import { ProfileData } from "@/connection/profile";
import { Stock } from "@/stock/columns";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layout";
import { useAuth } from "../providers/auth-provider";
import { DataTable } from "../ui/data-table";
import { Separator } from "../ui/separator";

interface Equipment {
  id: number;
  name: string;
  description: string;
  img: string;
  imgAlt: string;
  capacity: number;
}

export interface BookingReq {
  startTime: string;
  endTime: string;
  email?: string;
  equipmentID: number;
}

async function getStockData(): Promise<Stock[] | false> {
  const jwt = localStorage.getItem("jwt");
  try {
    const profile: AxiosResponse<ProfileData> = await axios.post(BACKEND_ADDRESS + USERS_JWT, jwt);

    if (profile.status >= 400) {
      return false;
    }

    const equipment: AxiosResponse<Equipment[]> = await axios.get(BACKEND_ADDRESS + EQUIPMENT_ALL);
    const stock: Stock[] = equipment.data.map((e) => ({
      id: e.id,
      itemName: e.name,
      quantity: 1,
    }));

    return stock;
  } catch (error) {
    return false;
  }
}

async function addBooking(booking: BookingReq) {
  const jwt = localStorage.getItem("jwt");
  try {
    const profile: AxiosResponse<ProfileData> = await axios.post(BACKEND_ADDRESS + USERS_JWT, jwt);

    if (profile.status >= 400) {
      return false;
    }

    const bookingToAdd: BookingReq = { ...booking, email: profile.data.email };
    const response: AxiosResponse<boolean> = await axios.post(BACKEND_ADDRESS + BOOKING_ADD, bookingToAdd);

    return response.data;
  } catch (error) {
    return false;
  }
}

const ReservationPage: React.FC = () => {
  const auth = useAuth();
  if (auth.token === "") return <Navigate to="/login" />;

  const stockQuery = useQuery({
    queryKey: ["stockData"],
    queryFn: getStockData,
  });
  if (stockQuery.data === false) return <Navigate to="/login" />;

  const [stockData] = useState<Stock[]>(stockQuery.data ?? []);

  const handleAddBooking = (newBooking: BookingReq) => {
    addBooking(newBooking);
  };

  const columns = [
    {
      id: "actions",
      cell: ({ row }: { row: any }) => {
        const selectedRow = row.original;
        return <AddBookingDialog onAddBooking={handleAddBooking} row={selectedRow} />;
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
      <div className="text-xl font-medium tracking-wide px-3">Rezerwacje</div>
      <Separator className="w-full my-3" />
      <DataTable columns={columns} data={stockData} />
    </Layout>
  );
};

export default ReservationPage;
