import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";

import CaseCard from "../../components/cases/CaseCard";

import useCases from "../../hooks/useCases";

function CaseHistory() {
  const navigate = useNavigate();

  const {
    respondedCases,
    closedCases,
    isLoading,
    error,
  } = useCases();

  const historyCases = useMemo(() => {
    return [
      ...respondedCases,
      ...closedCases,
    ].sort((firstCase, secondCase) => {
      const firstDate = new Date(
        firstCase.updatedAt ||
          firstCase.createdAt ||
          0,
      ).getTime();

      const secondDate = new Date(
        secondCase.updatedAt ||
          secondCase.createdAt ||
          0,
      ).getTime();

      return secondDate - firstDate;
    });
  }, [respondedCases, closedCases]);

  const handleCaseSelect = (caseItem) => {
    if (!caseItem?.id) {
      return;
    }

    navigate(`/doctor/cases/${caseItem.id}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Case History"
        description="View previously responded and closed patient cases."
      />

      {/* History summary */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Responded Cases
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {respondedCases.length}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Cases with a doctor's response
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Closed Cases
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {closedCases.length}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Completed patient cases
          </p>
        </div>
      </section>

      {isLoading ? (
        <LoadingState message="Loading case history..." />
      ) : error ? (
        <EmptyState
          title="Unable to load case history"
          description={error}
        />
      ) : historyCases.length === 0 ? (
        <EmptyState
          title="No case history"
          description="Previously responded or closed cases will appear here."
        />
      ) : (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Previous Cases
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select a case to review its complete details.
            </p>
          </div>

          <div className="grid gap-4">
            {historyCases.map((caseItem) => (
              <CaseCard
                key={caseItem.id}
                caseItem={caseItem}
                onOpen={handleCaseSelect}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default CaseHistory;