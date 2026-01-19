import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import IssueHistory from "../components/IssueHistory";

const StaffDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignedIssues();
  }, []);

  const fetchAssignedIssues = async () => {
    try {
      const res = await axiosInstance.get("/api/issues/assigned");
      setIssues(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load assigned issues");
      setIssues([]);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

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

        {/* Welcome */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <p className="text-lg">
            Welcome, <span className="font-semibold">{user?.email}</span>
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {issues.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center">
            No issues assigned to you.
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white p-6 rounded shadow"
              >
                <h2 className="text-lg font-semibold">{issue.title}</h2>
                <p className="text-gray-700">{issue.description}</p>

                <p className="text-sm text-gray-500 mb-3">
                  Category: {issue.category}
                </p>

                <div className="flex gap-4 items-center flex-wrap">

                  {/* Status Dropdown */}
                  <select
                    className="border p-2 rounded"
                    value={issue.status}
                    onChange={(e) =>
                      updateStatus(issue.id, e.target.value)
                    }
                  >
                    <option value="ASSIGNED">ASSIGNED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </select>

                  <span className="text-sm font-medium text-blue-600">
                    {issue.status}
                  </span>

                  {/* View History */}
                  <button
                    onClick={() => setSelectedIssueId(issue.id)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                  >
                    View Status History
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status History Modal */}
      {selectedIssueId && (
        <IssueHistory
          issueId={selectedIssueId}
          onClose={() => setSelectedIssueId(null)}
        />
      )}
    </div>
  );
};

export default StaffDashboard;
