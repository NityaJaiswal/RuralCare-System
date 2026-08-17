function LoadingState({
  message = "Loading...",
}) {
  return (
    <div
      className="flex min-h-40 items-center justify-center rounded-xl border border-slate-200 bg-white p-6"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"
          aria-hidden="true"
        />

        <span>{message}</span>
      </div>
    </div>
  );
}

export default LoadingState;