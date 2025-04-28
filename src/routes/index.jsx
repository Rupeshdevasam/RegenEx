import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import DocumentUpload from "../DocumentUpload";
import SignUp from "../Signup";
import Login from "../Login";
import NoAccess from "../NoAccess";
import Header from "../components/Header";
import Home from "../Home";
import Profile from "../Profile";
import HeatMap from "../HeatMap";
import DimViz from "../DimViz";
import Upload from "../Upload";
import PdfViewer from "../PdfViewer";

{
  /* <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        
      </Routes> */
}

const LayoutWithHeader = () => (
  <>
    <Header />
    <div className="px-5 py-5 md:px-25 md:py-5">
      <Outlet />
    </div>
  </>
);
const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      element: <LayoutWithHeader />,
      children: [
        {
          path: "/",
          element: <Navigate to="/home" replace />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/doc/:documentId",
          element: <PdfViewer />,
        },
      ],
    },
    {
      path: "*",
      element: <NoAccess />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          element: <LayoutWithHeader />,
          children: [
            { path: "/document/:query?", element: <DocumentUpload /> },
          ],
        },
        {
          element: <LayoutWithHeader />,
          children: [{ path: "/heatmap", element: <HeatMap /> }],
        },
        {
          element: <LayoutWithHeader />,
          children: [{ path: "/dimviz", element: <DimViz /> }],
        },
        {
          element: <LayoutWithHeader />,
          children: [{ path: "/upload", element: <Upload /> }],
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
