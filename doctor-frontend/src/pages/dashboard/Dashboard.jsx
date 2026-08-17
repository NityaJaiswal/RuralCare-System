import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import StatsCard from "../../components/dashboard/StatsCard";
import RecentCases from "../../components/dashboard/RecentCases";

import useCases from "../../hooks/useCases";

function Dashboard() {
  const navigate = useNavigate();

  const {
    cases,
    pendingCases,
    inReviewCases,
    respondedCases,
    isLoading,
  } = useCases();

  // -------------------------------------------------------
  // Dashboard statistics
  // -------------------------------------------------------

  const stats = useMemo(
    () => [
      {
        title: "Total Cases",
        value: cases.length,
        description: "All assigned patient cases",
        action: () => navigate("/doctor/cases"),
      },
      {
        title: "Pending Cases",
        value: pendingCases.length,
        description: "Cases awaiting review",
        action: () =>
          navigate("/doctor/cases?status=pending"),
      },
      {
        title: "In Review",
        value: inReviewCases.length,
        description: "Cases currently being reviewed",
        action: () =>
          navigate("/doctor/cases?status=in_review"),
      },
      {
        title: "Responded",
        value: respondedCases.length,
        description: "Cases with a doctor response",
        action: () =>
          navigate("/doctor/history"),
      },
    ],
    [
      cases.length,
      pendingCases.length,
      inReviewCases.length,
      respondedCases.length,
      navigate,
    ],
  );

  // -------------------------------------------------------
  // Recent cases
  // -------------------------------------------------------

  const recentCases = useMemo(() => {
    return [...cases]
      .sort((firstCase, secondCase) => {
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
      })
      .slice(0, 5);
  }, [cases]);

  // -------------------------------------------------------
  // Open individual case
  // -------------------------------------------------------

  const handleOpenCase = (caseItem) => {
    if (!caseItem?.id) {
      return;
    }

    navigate(`/doctor/cases/${caseItem.id}`);
  };

  // -------------------------------------------------------
  // Quick actions
  // -------------------------------------------------------

  const quickActions = [
    {
      title: "View Case Queue",
      description: "Review all assigned patient cases.",
      action: () => navigate("/doctor/cases"),
    },
    {
      title: "Pending Cases",
      description: "Review cases waiting for your response.",
      action: () =>
        navigate("/doctor/cases?status=pending"),
    },
    {
      title: "Case History",
      description: "View previously responded cases.",
      action: () => navigate("/doctor/history"),
    },
  ];

  return (
    <div className="space-y-8">
      {/* ===================================================
          Page Header
          =================================================== */}

      <PageHeader
        title="Doctor Dashboard"
        description="Overview of patient cases requiring your attention."
      />

      {/* ===================================================
          Statistics
          =================================================== */}

      <section
        aria-label="Case statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <button
            key={stat.title}
            type="button"
            onClick={stat.action}
            className="text-left transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            <StatsCard
              title={stat.title}
              value={stat.value}
              description={stat.description}
            />
          </button>
        ))}
      </section>

      {/* ===================================================
          Quick Actions
          =================================================== */}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly access the areas that need your attention.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={action.action}
              className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
            >
              <h3 className="font-semibold text-slate-900">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {action.description}
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Open →
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ===================================================
          Recent Cases
          =================================================== */}

      <section>
        <RecentCases
          cases={recentCases}
          onOpenCase={handleOpenCase}
          loading={isLoading}
        />
      </section>
    </div>
  );
}

export default Dashboard;