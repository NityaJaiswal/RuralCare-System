import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PhotoUpload() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handleContinue = () => {
    navigate("/consultation/create-case");
  };

  const handleSkip = () => {
    navigate("/consultation/create-case");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-emerald-700">
            RuralCare
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-6 py-10">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-emerald-600">
            New Consultation
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            Add a photo
          </h2>

          <p className="text-slate-500 mt-3">
            If you have a relevant photo of the affected area, you can
            upload it to help provide additional information.
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">

          <label
            htmlFor="photo"
            className="flex flex-col items-center justify-center
                       border-2 border-dashed border-slate-300
                       rounded-xl p-10 cursor-pointer
                       hover:border-emerald-500 hover:bg-emerald-50
                       transition"
          >

            {image ? (
              <>
                <div className="text-4xl mb-4">
                  ✅
                </div>

                <p className="font-semibold text-slate-700">
                  {image.name}
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  Photo selected successfully
                </p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-4">
                  📷
                </div>

                <p className="font-semibold text-slate-700">
                  Upload a photo
                </p>

                <p className="text-sm text-slate-400 mt-2">
                  Click here to choose an image
                </p>
              </>
            )}

            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

          </label>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end mt-7">

            <button
              type="button"
              onClick={handleSkip}
              className="px-6 py-3 rounded-xl
                         border border-slate-300
                         text-slate-700 font-semibold
                         hover:bg-slate-50 transition"
            >
              Skip
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!image}
              className="px-6 py-3 rounded-xl
                         bg-emerald-600 text-white font-semibold
                         hover:bg-emerald-700
                         disabled:bg-slate-300
                         disabled:cursor-not-allowed
                         transition"
            >
              Continue
            </button>

          </div>

        </div>

        {/* Note */}
        <p className="text-xs text-slate-400 text-center mt-6">
          Photo upload is optional. You can continue without providing
          an image.
        </p>

      </main>

    </div>
  );
}

export default PhotoUpload;