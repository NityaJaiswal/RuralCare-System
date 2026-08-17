import { useNavigate } from "react-router-dom";

function DoctorResponse() {
  const navigate = useNavigate();

  const handleViewPlan = () => {
    navigate("/consultation/doctor-plan");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm
                      border border-slate-200 p-8 text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100
                        flex items-center justify-center text-4xl">
          ✓
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mt-6">
          Your doctor has reviewed your case
        </h1>

        <p className="text-slate-500 mt-3 leading-relaxed">
          The doctor has reviewed your case and provided a care plan.
          You can now view the doctor's response.
        </p>

        <div className="mt-8 bg-emerald-50 border border-emerald-100
                        rounded-xl p-5">

          <p className="font-semibold text-emerald-700">
            Doctor's response is ready
          </p>

          <p className="text-sm text-slate-500 mt-2">
            View your precautions, medication and follow-up instructions.
          </p>

        </div>

        <button
          onClick={handleViewPlan}
          className="w-full mt-7 bg-emerald-600
                     hover:bg-emerald-700 text-white
                     font-semibold py-3 rounded-xl transition"
        >
          View Doctor's Plan
        </button>

        <div className="mt-5">
          <span className="inline-flex items-center px-3 py-1
                           rounded-full bg-slate-100
                           text-xs font-medium text-slate-600">
            Status: REVIEWED
          </span>
        </div>

      </div>

    </div>
  );
}

export default DoctorResponse;