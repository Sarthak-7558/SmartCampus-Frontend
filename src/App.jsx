import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

import CreateIssue from "./pages/CreateIssue";
import MyIssues from "./pages/MyIssues";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff"
        element={
          <ProtectedRoute allowedRoles={["STAFF"]}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/student/create"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <CreateIssue />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/issues"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <MyIssues />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;
