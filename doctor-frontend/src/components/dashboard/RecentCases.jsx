import CaseCard from "../cases/CaseCard";
import EmptyState from "../common/EmptyState";

function RecentCases({
  cases = [],
  onOpenCase,
}) {
  const recentCases = [...cases]
    .sort(
      (firstCase, secondCase) =>
        new Date(secondCase.updatedAt || secondCase.createdAt) -
        new Date(firstCase.updatedAt || firstCase.createdAt),
    )
    .slice(0, 5);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Cases
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recently updated patient cases.
          </p>
        </div>
      </div>

      {recentCases.length === 0 ? (
        <EmptyState
          title="No cases available"
          description="There are no patient cases to display yet."
        />
      ) : (
        <div className="space-y-4">
          {recentCases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              onOpen={onOpenCase}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentCases;