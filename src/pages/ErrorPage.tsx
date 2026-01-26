import { useNavigate } from "react-router-dom";

const ErrorPage = ({
  status,
  message,
}: {
  status?: number;
  message?: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">{status || "!"}</h1>
      <h2 className="text-2xl font-semibold mb-2">
        {message || "Page not found"}
      </h2>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist or an error occurred.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
