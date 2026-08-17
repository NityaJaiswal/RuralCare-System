import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WaitingForDoctor() {
  const navigate = useNavigate();

  useEffect(() => {
    // Temporary mock behavior.
    // Later replaced by WebSocket status updates.

    const timer = setTimeout(() => {
      navigate("/consultation/doctor-response");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm
                      border border-slate-200 p-8 text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-blue-100
                        flex items-center justify-center text-4xl">
          👨‍⚕️
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mt-6">
          Your case is with the doctor
        </h1>

        <p className="text-slate-500 mt-3 leading-relaxed">
          Your AI-assisted case summary has been sent to a doctor.
          Please wait while your case is reviewed.
        </p>

        <div className="mt-8 bg-blue-50 border border-blue-100
                        rounded-xl p-5">

          <div className="flex items-center justify-center gap-3">

            <div className="w-5 h-5 border-2 border-blue-600
                            border-t-transparent rounded-full animate-spin" />

            <p className="font-semibold text-blue-700">
              Doctor is reviewing your case...
            </p>

          </div>

          <p className="text-sm text-slate-500 mt-3">
            You will receive a notification when the doctor responds.
          </p>

        </div>

        <div className="mt-6">
          <span className="inline-flex items-center px-3 py-1
                           rounded-full bg-slate-100
                           text-xs font-medium text-slate-600">
            Status: WAITING_DOCTOR
          </span>
        </div>

      </div>

    </div>
  );
}

export default WaitingForDoctor;