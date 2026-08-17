import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AIReviewing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Temporary mock behavior.
    // Later this will be replaced by a real-time
    // status update from the backend/WebSocket.

    const timer = setTimeout(() => {
      navigate("/consultation/sent-to-doctor");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">

        {/* AI Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100
                        flex items-center justify-center text-4xl">
          🤖
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-slate-800 mt-6">
          Thank you!
        </h1>

        <p className="text-slate-500 mt-3 leading-relaxed">
          The AI assistant has collected the necessary information
          from your consultation.
        </p>

        {/* Status */}
        <div className="mt-8 bg-emerald-50 border border-emerald-100
                        rounded-xl p-5">

          <div className="flex items-center justify-center gap-3">

            <div className="w-5 h-5 border-2 border-emerald-600
                            border-t-transparent rounded-full animate-spin" />

            <p className="font-semibold text-emerald-700">
              Agent is reviewing your information...
            </p>

          </div>

          <p className="text-sm text-slate-500 mt-3">
            Your information is being organized into a structured
            summary for the doctor.
          </p>

        </div>

        {/* Status badge */}
        <div className="mt-6">
          <span className="inline-flex items-center px-3 py-1
                           rounded-full bg-slate-100
                           text-xs font-medium text-slate-600">
            Status: AI_REVIEWING
          </span>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Please don't close this page.
        </p>

      </div>

    </div>
  );
}

export default AIReviewing;