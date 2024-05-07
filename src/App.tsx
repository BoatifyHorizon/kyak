import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/login-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
