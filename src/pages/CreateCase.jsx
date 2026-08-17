import { useNavigate } from "react-router-dom";

function CreateCase() {
  const navigate = useNavigate();

  const handleCreateCase = () => {
    // Phase 1:
    // Mock case creation.
    // Backend REST API will be connected during integration.

    navigate("/consultation/chat");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-emerald-700">
            RuralCare
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-sm font-medium text-emerald-600">
            New Consultation
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            Create your case
          </h2>

          <p className="text-slate-500 mt-3">
            Review your consultation information before starting the
            AI-assisted consultation.
          </p>
        </div>

        {/* Summary */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">

          <h3 className="text-lg font-semibold text-slate-800 mb-5">
            Consultation Summary
          </h3>

          <div className="space-y-4">

            <div className="flex items-center justify-between
                            border-b border-slate-100 pb-4">
              <span className="text-slate-500">
                Symptoms
              </span>

              <span className="font-medium text-emerald-600">
                Provided
              </span>
            </div>

            <div className="flex items-center justify-between
                            border-b border-slate-100 pb-4">
              <span className="text-slate-500">
                Photo
              </span>

              <span className="font-medium text-slate-600">
                Optional
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">
                Consultation type
              </span>

              <span className="font-medium text-slate-700">
                AI-assisted triage
              </span>
            </div>

          </div>

          {/* Create Case */}
          <button
            type="button"
            onClick={handleCreateCase}
            className="w-full mt-8 bg-emerald-600
                       hover:bg-emerald-700
                       text-white font-semibold
                       py-3 rounded-xl transition"
          >
            Create Case
          </button>

        </div>

        <p className="text-xs text-slate-400 text-center mt-6">
          Your case will be created for the consultation workflow.
        </p>

      </main>

    </div>
  );
}

export default CreateCase;