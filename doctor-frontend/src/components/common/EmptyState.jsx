function EmptyState({
  title = "Nothing here yet",
  description = "",
  action = null,
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <span className="text-xl" aria-hidden="true">
          —
        </span>
      </div>

      <h2 className="text-base font-semibold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;