import Layout from "../layout";
import { bookingsMockData } from "@/mocks/booking/bookings-mock-data";
import { Booking, columns } from "@/bookings/columns";
import { DataTable } from "../ui/data-table";

function getData(): Booking[] {
  // TODO: retrieving data using API
  return bookingsMockData;
}
const ReservationPage = () => {
  const data = getData();

  return (
    <Layout>
      <DataTable columns={columns} data={data} />
    </Layout>
  );
};

export default ReservationPage;
