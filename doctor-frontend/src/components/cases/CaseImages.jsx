function CaseImages({ images = [] }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Uploaded Images
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Images submitted by the patient with this case.
        </p>
      </div>

      {images.length === 0 ? (
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No images were uploaded for this case.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <figure
              key={image.id || image.url || index}
              className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
            >
              <img
                src={image.url}
                alt={
                  image.caption ||
                  `Patient uploaded image ${index + 1}`
                }
                className="aspect-video w-full object-cover"
                loading="lazy"
              />

              {image.caption && (
                <figcaption className="p-3 text-sm text-slate-600">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}

export default CaseImages;