import {
  CASE_FILTERS,
  CASE_STATUS_LABELS,
} from "../../utils/constants";

function CaseFilters({
  activeFilter,
  onFilterChange,
}) {
  const filters = [
    {
      value: CASE_FILTERS.ALL,
      label: "All Cases",
    },
    {
      value: CASE_FILTERS.PENDING,
      label: CASE_STATUS_LABELS.pending,
    },
    {
      value: CASE_FILTERS.IN_REVIEW,
      label: CASE_STATUS_LABELS.in_review,
    },
    {
      value: CASE_FILTERS.RESPONDED,
      label: CASE_STATUS_LABELS.responded,
    },
    {
      value: CASE_FILTERS.CLOSED,
      label: CASE_STATUS_LABELS.closed,
    },
  ];

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Case filters"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${
              isActive
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
            aria-pressed={isActive}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

export default CaseFilters;