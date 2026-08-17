import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewCase() {
  const [symptoms, setSymptoms] = useState("");

  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();

    if (!symptoms.trim()) {
      return;
    }

    // Phase 1:
    // We are only collecting the patient's input.
    // Backend case creation will be connected later.

    navigate("/consultation/photo");
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

        {/* Progress */}
        <div className="mb-8">

          <p className="text-sm font-medium text-emerald-600">
            New Consultation
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            Tell us about your symptoms
          </h2>

          <p className="text-slate-500 mt-3">
            Describe what you are experiencing. Include any symptoms,
            how long you have had them, and anything else you think
            may be important.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleContinue}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7"
        >

          <label
            htmlFor="symptoms"
            className="block text-sm font-semibold text-slate-700 mb-3"
          >
            Describe your symptoms
          </label>

          <textarea
            id="symptoms"
            rows="8"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="For example: I have been experiencing..."
            className="w-full px-4 py-3 border border-slate-300 rounded-xl
                       resize-none focus:outline-none
                       focus:ring-2 focus:ring-emerald-500
                       focus:border-emerald-500"
          />

          <p className="text-xs text-slate-400 mt-2">
            Please provide as much relevant information as possible.
          </p>

          {/* Continue */}
          <div className="flex justify-end mt-7">

            <button
              type="submit"
              disabled={!symptoms.trim()}
              className="px-6 py-3 rounded-xl font-semibold text-white
                         bg-emerald-600 hover:bg-emerald-700
                         disabled:bg-slate-300 disabled:cursor-not-allowed
                         transition"
            >
              Continue
            </button>

          </div>

        </form>

        {/* Safety note */}
        <p className="text-xs text-slate-400 text-center mt-6">
          RuralCare uses the information you provide to assist with
          symptom triage and case preparation. A doctor makes the
          final medical decision.
        </p>

      </main>

    </div>
  );
}

export default NewCase;