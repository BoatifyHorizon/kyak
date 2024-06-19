import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HistoryPage from "./components/pages/history-page";
import LoginPage from "./components/pages/login-page";
import ProfilePage from "./components/pages/profile-page";
import ReservationPage from "./components/pages/reservation-page";
import StockPage from "./components/pages/stock-page";
import AuthProvider from "./components/providers/auth-provider";
import { ToastProvider } from "./components/ui/toast";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <Toaster />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<ProfilePage />} />
              <Route path="/asortyment" element={<StockPage />} />
              <Route path="/rezerwacje" element={<ReservationPage />} />
              <Route path="/historia" element={<HistoryPage />} />
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
