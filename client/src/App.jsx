import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import DeviceDetails from "./pages/DeviceDetails";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Redirect root */}
        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />
{/* login */}
<Route
  path="/login"
  element={<Login />}
/>

        {/* Dashboard */}
       <Route
  path="/dashboard"
  element={
    <ProtectedRoute
      allowedRoles={[
        "admin",
        "operator",
        "viewer",
      ]}
    >
      <Dashboard />
    </ProtectedRoute>
  }
/>

        {/* Devices */}
        <Route
          path="/devices"
          element={<Dashboard />}
        />

        {/* Device Details */}
        <Route
          path="/devices/:id"
          element={<DeviceDetails />}
        />

        {/* Analytics */}
      <Route
  path="/analytics"
  element={
    <ProtectedRoute
      allowedRoles={[
        "admin",
        "operator",
      ]}
    >
      <Analytics />
    </ProtectedRoute>
  }
/>

        {/* Settings */}
       <Route
  path="/settings"
  element={
    <ProtectedRoute
      allowedRoles={["admin"]}
    >
      <Settings />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}