import { useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const CreateIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axiosInstance.post("/api/issues/create", {
        title,
        description,
        category,
      });

      setSuccess("Issue created successfully");

      // clear form
      setTitle("");
      setDescription("");
      setCategory("");

      // redirect after short delay
      setTimeout(() => {
        navigate("/student/issues");
      }, 1000);

    } catch (err) {
      setError("Failed to create issue");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Raise New Issue
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-sm mb-4 text-center">{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Issue Title"
            className="w-full p-2 border mb-4 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Issue Description"
            className="w-full p-2 border mb-4 rounded"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Category (e.g. Hostel, Network, Classroom)"
            className="w-full p-2 border mb-6 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/student")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIssue;
