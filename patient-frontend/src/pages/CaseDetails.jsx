import { Link, useParams } from "react-router-dom";

function CaseDetails() {
  const { caseId } = useParams();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link
            to="/home"
            className="text-2xl font-bold text-emerald-700"
          >
            RuralCare
          </Link>

          <Link
            to="/history"
            className="text-sm text-slate-600 hover:text-emerald-600"
          >
            ← Back to History
          </Link>

        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">

        <div className="mb-8">

          <p className="text-sm font-medium text-emerald-600">
            Previous Consultation
          </p>

          <h1 className="text-3xl font-bold text-slate-800 mt-2">
            Case #{caseId}
          </h1>

          <span className="inline-flex mt-3 px-3 py-1 rounded-full
                           bg-emerald-100 text-emerald-700
                           text-xs font-medium">
            Reviewed
          </span>

        </div>

        {/* Symptoms */}
        <section className="bg-white border border-slate-200
                            rounded-2xl shadow-sm p-6 mb-5">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Symptoms
          </h2>

          <p className="text-slate-600 leading-relaxed">
            Fever and cough reported during the consultation.
          </p>

        </section>

        {/* AI Summary */}
        <section className="bg-white border border-slate-200
                            rounded-2xl shadow-sm p-6 mb-5">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Consultation Summary
          </h2>

          <div className="space-y-3 text-slate-600">

            <p>
              <span className="font-medium text-slate-700">
                Duration:
              </span>{" "}
              Three days
            </p>

            <p>
              <span className="font-medium text-slate-700">
                Severity:
              </span>{" "}
              Moderate
            </p>

          </div>

        </section>

        {/* Doctor Plan */}
        <section className="bg-white border border-slate-200
                            rounded-2xl shadow-sm p-6">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Doctor's Plan
          </h2>

          <div className="space-y-5">

            <div>
              <h3 className="font-semibold text-slate-700">
                Precautions
              </h3>

              <ul className="mt-2 space-y-2 text-slate-600">
                <li>• Rest adequately.</li>
                <li>• Drink sufficient fluids.</li>
                <li>• Monitor symptoms.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-700">
                Medication
              </h3>

              <p className="mt-2 text-slate-600">
                Doctor-provided medication plan.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-700">
                Follow-up
              </h3>

              <p className="mt-2 text-slate-600">
                Follow the instructions provided by your doctor.
              </p>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default CaseDetails;