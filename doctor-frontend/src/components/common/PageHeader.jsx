function PageHeader({
  title,
  description,
  action = null,
  breadcrumb = null,
}) {
  return (
    <header className="mb-6">
      {breadcrumb && (
        <div className="mb-2 text-sm text-slate-500">
          {breadcrumb}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>

          {description && (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
              {description}
            </p>
          )}
        </div>

        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>
    </header>
  );
}

export default PageHeader;