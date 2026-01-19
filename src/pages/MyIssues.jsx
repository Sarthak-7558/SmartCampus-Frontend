import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import IssueHistory from "../components/IssueHistory";

const MyIssues = () => {
  const [issues, setIssues] = useState([]);   // always array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axiosInstance.get("/api/issues/my");
        setIssues(Array.isArray(response.data) ? response.data : []);
      } catch {
        setError("Failed to load issues");
        setIssues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

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
          <h1 className="text-2xl font-bold">My Issues</h1>
          <button
            onClick={() => navigate("/student")}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {!error && issues.length === 0 && (
          <div className="bg-white p-6 rounded shadow text-center">
            No issues raised yet.
          </div>
        )}

        {issues.length > 0 && (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white p-6 rounded shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold">
                    {issue.title}
                  </h2>
                  <span
                    className={`px-3 py-1 text-sm rounded ${getStatusColor(
                      issue.status
                    )}`}
                  >
                    {issue.status}
                  </span>
                </div>

                <p className="text-gray-700 mb-2">
                  {issue.description}
                </p>

                <p className="text-sm text-gray-500 mb-3">
                  Category: {issue.category}
                </p>

                {/* View Status History (only when meaningful for students) */}
                {issue.status !== "OPEN" && (
                  <button
                    onClick={() => setSelectedIssueId(issue.id)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                  >
                    View Status History
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History Modal */}
      {selectedIssueId && (
        <IssueHistory
          issueId={selectedIssueId}
          onClose={() => setSelectedIssueId(null)}
        />
      )}
    </div>
  );
};

export default MyIssues;
