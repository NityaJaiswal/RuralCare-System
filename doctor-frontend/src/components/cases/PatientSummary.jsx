function PatientSummary({ patient }) {
  if (!patient) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Patient Information
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Patient information is not available.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Patient Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Basic information associated with this case.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Name
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            {patient.name || "Not available"}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Age
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            {patient.age ?? "Not available"}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Gender
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            {patient.gender || "Not available"}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Patient ID
          </p>

          <p className="mt-1 break-all text-sm font-medium text-slate-900">
            {patient.id || "Not available"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PatientSummary;