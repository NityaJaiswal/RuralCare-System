import { Link } from "react-router-dom";

function Home() {
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

          <button className="text-sm font-medium text-slate-600 hover:text-emerald-600">
            Logout
          </button>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Welcome */}
        <section className="mb-10">
          <p className="text-sm font-medium text-emerald-600 mb-2">
            Patient Dashboard
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Welcome to RuralCare 👋
          </h1>

          <p className="mt-3 text-slate-500 max-w-2xl">
            Get started with a new consultation or review your previous
            healthcare cases.
          </p>
        </section>

        {/* Main Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* New Consultation */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">

            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl mb-5">
              🩺
            </div>

            <h2 className="text-xl font-semibold text-slate-800">
              Start New Consultation
            </h2>

            <p className="mt-2 text-slate-500 leading-relaxed">
              Describe your symptoms and provide additional information
              to begin a new healthcare case.
            </p>

            <Link
              to="/consultation"
              className="inline-block mt-6 bg-emerald-600 hover:bg-emerald-700
                         text-white font-semibold px-5 py-3 rounded-xl transition"
            >
              Start Consultation
            </Link>

          </div>

          {/* Previous Cases */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">

            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl mb-5">
              📋
            </div>

            <h2 className="text-xl font-semibold text-slate-800">
              My Previous Cases
            </h2>

            <p className="mt-2 text-slate-500 leading-relaxed">
              View your previous consultations, case status, and doctor's
              plans.
            </p>

            <Link
              to="/history"
              className="inline-block mt-6 border border-slate-300 hover:border-emerald-500
                         hover:text-emerald-600 text-slate-700 font-semibold
                         px-5 py-3 rounded-xl transition"
            >
              View My Cases
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Home;