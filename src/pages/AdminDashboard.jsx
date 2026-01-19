import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchIssues();
    fetchStaff();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axiosInstance.get("/api/issues/all");
      setIssues(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load issues");
      setIssues([]);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await axiosInstance.get("/api/users/staff");
      setStaffList(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load staff");
      setStaffList([]);
    }
  };

  const assignIssue = async (issueId, staffId) => {
    if (!staffId) return;

    try {
      await axiosInstance.put("/api/issues/assign", null, {
        params: { issueId, staffId },
      });

      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === issueId
            ? { ...issue, status: "ASSIGNED" }
            : issue
        )
      );
    } catch {
      alert("Failed to assign issue");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
            No issues available.
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

                <div className="flex gap-3 items-center">
                  <select
                    className="border p-2 rounded"
                    defaultValue=""
                    onChange={(e) =>
                      assignIssue(issue.id, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Assign to Staff
                    </option>
                    {staffList.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>

                  <span className="text-sm font-medium text-blue-600">
                    {issue.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
