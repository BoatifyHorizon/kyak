import { Booking } from "@/bookings/columns";

export const bookingsMockData: Booking[] = [
  {
    id: 1,
    name: "John Doe",
    bookingDate: new Date("2024-06-01T08:00:00Z"),
    startDate: new Date("2024-06-10T14:00:00Z"),
    endDate: new Date("2024-06-15T11:00:00Z"),
  },
  {
    id: 2,
    name: "Jane Smith",
    bookingDate: new Date("2024-06-02T09:30:00Z"),
    startDate: new Date("2024-06-11T12:00:00Z"),
    endDate: new Date("2024-06-16T10:45:00Z"),
  },
  {
    id: 3,
    name: "Alice Johnson",
    bookingDate: new Date("2024-06-03T11:15:00Z"),
    startDate: new Date("2024-06-12T16:30:00Z"),
    endDate: new Date("2024-06-17T09:00:00Z"),
  },
  {
    id: 4,
    name: "Bob Brown",
    bookingDate: new Date("2024-06-04T13:45:00Z"),
    startDate: new Date("2024-06-13T10:00:00Z"),
    endDate: new Date("2024-06-18T08:30:00Z"),
  },
];
