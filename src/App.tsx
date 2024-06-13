import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/login-page";
import ProfilePage from "./components/pages/profile-page";
import StockPage from "./components/pages/stock-page";
import ReservationPage from "./components/pages/reservation-page";
import HistoryPage from "./components/pages/history-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProfilePage />,
  },
  {
    path: "/asortyment",
    element: <StockPage />,
  },
  {
    path: "/rezerwacje",
    element: <ReservationPage />,
  },
  {
    path: "/historia",
    element: <HistoryPage />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
