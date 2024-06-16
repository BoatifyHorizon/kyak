import { Booking } from "@/history/columns";

export const bookingsMockData: Booking[] = [
  {
    id: 1,
    itemName: "Morska 1os",
    quantity: 1,
    bookingDate: new Date("2024-06-01T08:00:00Z").toISOString(),
    startDate: new Date("2024-06-10T14:00:00Z").toISOString(),
    endDate: new Date("2024-06-15T11:00:00Z").toISOString(),
  },
  {
    id: 2,
    itemName: "Morska 2os",
    quantity: 2,
    bookingDate: new Date("2024-06-02T09:30:00Z").toISOString(),
    startDate: new Date("2024-06-11T12:00:00Z").toISOString(),
    endDate: new Date("2024-06-16T10:45:00Z").toISOString(),
  },
  {
    id: 3,
    itemName: "Wiosło",
    quantity: 2,
    bookingDate: new Date("2024-06-03T11:15:00Z").toISOString(),
    startDate: new Date("2024-06-12T16:30:00Z").toISOString(),
    endDate: new Date("2024-06-17T09:00:00Z").toISOString(),
  },
  {
    id: 4,
    itemName: "Bob Brown",
    quantity: 1,
    bookingDate: new Date("2024-06-04T13:45:00Z").toISOString(),
    startDate: new Date("2024-06-13T10:00:00Z").toISOString(),
    endDate: new Date("2024-06-18T08:30:00Z").toISOString(),
  },
];
