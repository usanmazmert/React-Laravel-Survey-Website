import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Surveys from "./views/Surveys";
import Signup from "./views/Signup";
import GuestLayout from "./components/GuestLayout.tsx";
import DefaultLayout from "./components/DefaultLayout.tsx";
import SurveyView from "./views/SurveyView.tsx";
import SurveyPublicView from "./views/SurveyPublicView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: "/surveys",
        element: <Surveys />,
      },
      {
        path: "/surveys/create",
        element: <SurveyView />,
      },
      {
        path: "/surveys/:id",
        element: <SurveyView />,
      },
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/survey/public/:slug",
    element: <SurveyPublicView />,
  },
]);

export default router;
