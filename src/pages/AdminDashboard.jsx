import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/api/issues/all")
      .then((res) => {
        console.log("RAW ADMIN ISSUES RESPONSE:", res.data);
        console.log("sakshi", typeof res.data)
        const cleaned = res.data?.map((issue) => ({
          id: issue.id,
          title: issue.title,
          description: issue.description,
          category: issue.category,
          status: issue.status,
          createdAt: issue.createdAt,
          createdBy: issue.createdBy?.email ?? "Unknown",
          assignedTo: issue.assignedTo?.email ?? "Unassigned",
        }));

        console.log("SANITIZED ISSUES:", typeof(cleaned));
        setIssues(cleaned);
      })
      .catch((err) => {
        console.error("ADMIN FETCH ERROR:", err);
        setIssues([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      {loading && <p>Loading issues...</p>}

      {!loading && issues.length === 0 && (
        <div className="bg-white p-6 rounded shadow">
          No issues available.
        </div>
      )}

      {!loading && issues.length > 0 && (
        <div className="space-y-4">
          {issues?.map((issue) => (
            <div key={issue.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold text-lg">{issue.title}</h2>
              <p>{issue.description}</p>
              <div className="text-sm text-gray-600 mt-2">
                <p>Category: {issue.category}</p>
                <p>Status: {issue.status}</p>
                <p>Created By: {issue.createdBy}</p>
                <p>Assigned To: {issue.assignedTo}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
