import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";

import CaseCard from "../../components/cases/CaseCard";
import CaseFilters from "../../components/cases/CaseFilters";

import useCases from "../../hooks/useCases";

function CaseQueue() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    cases,
    isLoading,
    error,
  } = useCases();

  const initialStatus =
    searchParams.get("status") || "all";

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState(initialStatus);
  const [urgencyFilter, setUrgencyFilter] =
    useState("all");

  const filteredCases = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    return cases.filter((caseItem) => {
      const matchesSearch =
        !normalizedSearch ||
        String(caseItem.id || "")
          .toLowerCase()
          .includes(normalizedSearch) ||
        String(caseItem.title || "")
          .toLowerCase()
          .includes(normalizedSearch) ||
        String(caseItem.patient?.name || "")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        caseItem.status === statusFilter;

      const matchesUrgency =
        urgencyFilter === "all" ||
        caseItem.urgency === urgencyFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesUrgency
      );
    });
  }, [
    cases,
    searchTerm,
    statusFilter,
    urgencyFilter,
  ]);

  const handleCaseSelect = (caseItem) => {
    if (!caseItem?.id) {
      return;
    }

    navigate(`/doctor/cases/${caseItem.id}`);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setUrgencyFilter("all");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Case Queue"
        description="Review and respond to patient cases assigned to you."
      />

      <CaseFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        urgencyFilter={urgencyFilter}
        onUrgencyChange={setUrgencyFilter}
      />

      {/* Active filter summary */}
      {(searchTerm ||
        statusFilter !== "all" ||
        urgencyFilter !== "all") && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-sm text-blue-800">
            Showing{" "}
            <span className="font-semibold">
              {filteredCases.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {cases.length}
            </span>{" "}
            cases.
          </p>

          <button
            type="button"
            onClick={handleClearFilters}
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Clear filters
          </button>
        </div>
      )}

      {isLoading ? (
        <LoadingState message="Loading patient cases..." />
      ) : error ? (
        <EmptyState
          title="Unable to load cases"
          description={error}
        />
      ) : filteredCases.length === 0 ? (
        <EmptyState
          title="No cases found"
          description={
            cases.length === 0
              ? "There are currently no patient cases available."
              : "No cases match the selected filters."
          }
        />
      ) : (
        <section className="grid gap-4">
          {filteredCases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              onOpen={handleCaseSelect}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default CaseQueue;