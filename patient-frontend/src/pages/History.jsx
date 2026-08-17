import { Link } from "react-router-dom";
import { useCase } from "../context/CaseContext";

function History() {
  const { cases } = useCase();

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
            to="/home"
            className="text-sm text-slate-600 hover:text-emerald-600"
          >
            Home
          </Link>

        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Heading */}
        <div className="mb-8">

          <p className="text-sm font-medium text-emerald-600">
            Patient Records
          </p>

          <h1 className="text-3xl font-bold text-slate-800 mt-2">
            My Case History
          </h1>

          <p className="text-slate-500 mt-3">
            View your previous consultations and doctor responses.
          </p>

        </div>

        {/* Cases */}
        {cases.length > 0 ? (

          <div className="space-y-4">

            {cases.map((caseItem) => (

              <div
                key={caseItem.id}
                className="bg-white border border-slate-200
                           rounded-2xl shadow-sm p-6"
              >

                <div className="flex flex-col md:flex-row
                                md:items-center
                                md:justify-between
                                gap-5">

                  <div>

                    <div className="flex flex-wrap
                                    items-center gap-3">

                      <h2 className="font-semibold text-slate-800">
                        Case #{caseItem.id}
                      </h2>

                      <span
                        className="px-2.5 py-1 rounded-full
                                   bg-emerald-100 text-emerald-700
                                   text-xs font-medium"
                      >
                        {caseItem.status || "Completed"}
                      </span>

                    </div>

                    <p className="text-slate-600 mt-2">

                      {caseItem.symptoms ||
                        "Symptoms recorded during consultation"}

                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      {caseItem.date || "Date unavailable"}
                    </p>

                  </div>

                  <Link
                    to={`/history/${caseItem.id}`}
                    className="text-center px-5 py-3
                               border border-slate-300
                               hover:border-emerald-500
                               hover:text-emerald-600
                               rounded-xl font-semibold
                               text-slate-700 transition"
                  >
                    View Case
                  </Link>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* Empty State */
          <div
            className="bg-white border border-slate-200
                       rounded-2xl p-10 text-center"
          >

            <div
              className="w-14 h-14 mx-auto mb-4
                         rounded-full bg-emerald-50
                         flex items-center justify-center"
            >
              <span className="text-2xl">
                📋
              </span>
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              No consultations yet
            </h2>

            <p className="text-slate-500 mt-2">
              Your completed consultations will appear here.
            </p>

            <Link
              to="/consultation"
              className="inline-block mt-5
                         bg-emerald-600
                         hover:bg-emerald-700
                         text-white px-5 py-3
                         rounded-xl font-semibold
                         transition"
            >
              Start Consultation
            </Link>

          </div>

        )}

      </main>

    </div>
  );
}

export default History;