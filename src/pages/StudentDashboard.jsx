import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Student Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Welcome */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <p className="text-lg">
            Welcome, <span className="font-semibold">{user?.email}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Create Issue */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Raise New Issue</h2>
            <button
              onClick={() => navigate("/student/create")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Issue
            </button>
          </div>

          {/* View Issues */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">My Issues</h2>
            <button
              onClick={() => navigate("/student/issues")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              View My Issues
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
