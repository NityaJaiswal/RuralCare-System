import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SentToDoctor() {
  const navigate = useNavigate();

  useEffect(() => {
    // Temporary frontend-only behavior.
    // Later this will be replaced by real-time
    // status updates from the backend.

    const timer = setTimeout(() => {
      navigate("/consultation/waiting-doctor");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm
                      border border-slate-200 p-8 text-center">

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100
                        flex items-center justify-center text-4xl">
          ✓
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-slate-800 mt-6">
          Your case has been sent to a doctor
        </h1>

        <p className="text-slate-500 mt-3 leading-relaxed">
          Your consultation information and AI-generated summary
          have been prepared for doctor review.
        </p>

        {/* Status */}
        <div className="mt-8 bg-blue-50 border border-blue-100
                        rounded-xl p-5">

          <div className="flex items-center justify-center gap-3">

            <div className="w-5 h-5 border-2 border-blue-600
                            border-t-transparent rounded-full animate-spin" />

            <p className="font-semibold text-blue-700">
              Waiting for doctor review...
            </p>

          </div>

          <p className="text-sm text-slate-500 mt-3">
            You will be notified when the doctor responds to your case.
          </p>

        </div>

        {/* Status Badge */}
        <div className="mt-6">
          <span className="inline-flex items-center px-3 py-1
                           rounded-full bg-slate-100
                           text-xs font-medium text-slate-600">
            Status: SENT_TO_DOCTOR
          </span>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          You can safely wait while your case is being reviewed.
        </p>

      </div>

    </div>
  );
}

export default SentToDoctor;