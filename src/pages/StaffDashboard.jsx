import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignedIssues = async () => {
      try {
        const response = await axiosInstance.get("/api/issues/assigned");
        setIssues(Array.isArray(response.data) ? response.data : []);
      } catch {
        setError("Failed to load assigned issues");
        setIssues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedIssues();
  }, []);

  const updateStatus = async (issueId, status) => {
    try {
      await axiosInstance.put("/api/issues/update-status", null, {
        params: { issueId, status },
      });

      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === issueId ? { ...issue, status } : issue
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-yellow-100 text-yellow-800";
      case "ASSIGNED":
        return "bg-blue-100 text-blue-800";
      case "IN_PROGRESS":
        return "bg-purple-100 text-purple-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Staff Dashboard</h1>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {issues.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center">
            No assigned issues.
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue.id} className="bg-white p-6 rounded shadow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold">{issue.title}</h2>
                  <span
                    className={`px-3 py-1 text-sm rounded ${getStatusColor(
                      issue.status
                    )}`}
                  >
                    {issue.status}
                  </span>
                </div>

                <p className="text-gray-700 mb-2">{issue.description}</p>

                <p className="text-sm text-gray-500 mb-4">
                  Category: {issue.category}
                </p>

                <div className="flex gap-3">
                  {issue.status !== "IN_PROGRESS" && (
                    <button
                      onClick={() =>
                        updateStatus(issue.id, "IN_PROGRESS")
                      }
                      className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                    >
                      Mark In Progress
                    </button>
                  )}

                  {issue.status !== "RESOLVED" && (
                    <button
                      onClick={() =>
                        updateStatus(issue.id, "RESOLVED")
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
