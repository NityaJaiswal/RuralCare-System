function AISummary({ aiSummary }) {
  if (!aiSummary) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          AI Summary
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          No AI summary is available for this case.
        </p>
      </section>
    );
  }

  const {
    summary = "",
    possibleConditions = [],
    recommendations = [],
  } = aiSummary;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-900">
            AI Summary
          </h2>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            AI-assisted
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Review this summary together with the available patient
          information before making a decision.
        </p>
      </div>

      <div className="space-y-5">
        {/* Summary */}
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Summary
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {summary || "No summary available."}
          </p>
        </div>

        {/* Possible conditions */}
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Possible Conditions
          </h3>

          {possibleConditions.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {possibleConditions.map((condition) => (
                <li
                  key={condition}
                  className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"
                >
                  {condition}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              No possible conditions listed.
            </p>
          )}
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            AI Recommendations
          </h3>

          {recommendations.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
              {recommendations.map((recommendation) => (
                <li key={recommendation}>
                  {recommendation}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              No recommendations available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AISummary;