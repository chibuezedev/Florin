"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleGoBack = () => {
    switch (user?.role) {
      case "student":
        router.push("/student");
        break;
      case "faculty":
        router.push("/faculty");
        break;
      case "staff":
        router.push("/staff");
        break;
      case "admin":
        router.push("/admin");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Access Denied</h1>
        <p className="mb-6 text-gray-600">
          You don't have permission to access this page.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
          <button
            onClick={logout}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
