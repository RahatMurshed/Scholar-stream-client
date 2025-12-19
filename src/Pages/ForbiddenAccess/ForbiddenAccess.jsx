import { MdBlock } from "react-icons/md";

export default function ForbiddenAccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-6 rounded-full bg-red-100 text-red-600">
            <MdBlock size={60} />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-red-600">403</h1>
        <h2 className="text-2xl font-semibold mt-2">Forbidden Access</h2>

        <p className="mt-3 text-base-content/70 max-w-md">
          You don't have permission to access this page.  
          Please contact an administrator if you believe this is a mistake.
        </p>

        <button
          onClick={() => window.history.back()}
          className="btn btn-primary mt-6 text-secondary"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
