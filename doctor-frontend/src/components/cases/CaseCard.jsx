import {
  CASE_STATUS_LABELS,
  CASE_STATUS,
  URGENCY_LABELS,
  URGENCY_LEVELS,
} from "../../utils/constants";

function getUrgencyClasses(urgency) {
  switch (urgency) {
    case URGENCY_LEVELS.CRITICAL:
      return "bg-red-100 text-red-800";

    case URGENCY_LEVELS.HIGH:
      return "bg-orange-100 text-orange-800";

    case URGENCY_LEVELS.MEDIUM:
      return "bg-amber-100 text-amber-800";

    case URGENCY_LEVELS.LOW:
    default:
      return "bg-emerald-100 text-emerald-800";
  }
}

function getStatusClasses(status) {
  switch (status) {
    case CASE_STATUS.RESPONDED:
      return "bg-emerald-100 text-emerald-800";

    case CASE_STATUS.IN_REVIEW:
      return "bg-blue-100 text-blue-800";

    case CASE_STATUS.CLOSED:
      return "bg-slate-100 text-slate-700";

    case CASE_STATUS.PENDING:
    default:
      return "bg-amber-100 text-amber-800";
  }
}

function CaseCard({
  caseItem,
  onOpen,
}) {
  const {
    id,
    patient,
    symptoms = [],
    urgency,
    status,
    createdAt,
  } = caseItem;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString()
    : "Date unavailable";

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Case {id}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {patient?.name || "Patient"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {patient?.age
              ? `${patient.age} years`
              : "Age unavailable"}

            {patient?.gender
              ? ` • ${patient.gender}`
              : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getUrgencyClasses(
              urgency,
            )}`}
          >
            {URGENCY_LABELS[urgency] || "Unknown urgency"}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
              status,
            )}`}
          >
            {CASE_STATUS_LABELS[status] || "Unknown status"}
          </span>
        </div>
      </div>

      {/* Symptoms */}
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Reported symptoms
        </p>

        {symptoms.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {symptoms.map((symptom) => (
              <span
                key={symptom}
                className="rounded-md bg-slate-100 px-2.5 py-1 text-sm text-slate-700"
              >
                {symptom}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-500">
            No symptoms recorded.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Submitted: {formattedDate}
        </p>

        <button
          type="button"
          onClick={() => onOpen?.(caseItem)}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          Review Case
        </button>
      </div>
    </article>
  );
}

export default CaseCard;