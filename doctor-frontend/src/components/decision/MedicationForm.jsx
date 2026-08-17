import {
  MEDICATION_FREQUENCIES,
  MEDICATION_FREQUENCY_LABELS,
} from "../../utils/constants";

function MedicationForm({
  medications,
  onChange,
}) {
  const addMedication = () => {
    onChange([
      ...medications,
      {
        name: "",
        dosage: "",
        frequency: MEDICATION_FREQUENCIES.ONCE_DAILY,
        duration: "",
      },
    ]);
  };

  const updateMedication = (index, field, value) => {
    const updatedMedications = medications.map(
      (medication, medicationIndex) =>
        medicationIndex === index
          ? {
              ...medication,
              [field]: value,
            }
          : medication,
    );

    onChange(updatedMedications);
  };

  const removeMedication = (index) => {
    onChange(
      medications.filter(
        (_, medicationIndex) => medicationIndex !== index,
      ),
    );
  };

  return (
    <div className="space-y-4">
      {medications.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            No medication has been added.
          </p>
        </div>
      ) : (
        medications.map((medication, index) => (
          <div
            key={`medication-${index}`}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-800">
                Medication {index + 1}
              </h4>

              <button
                type="button"
                onClick={() => removeMedication(index)}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Medicine name */}
              <div>
                <label
                  htmlFor={`medication-name-${index}`}
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Medicine name
                </label>

                <input
                  id={`medication-name-${index}`}
                  type="text"
                  value={medication.name}
                  onChange={(event) =>
                    updateMedication(
                      index,
                      "name",
                      event.target.value,
                    )
                  }
                  placeholder="Enter medicine name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              {/* Dosage */}
              <div>
                <label
                  htmlFor={`medication-dosage-${index}`}
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Dosage
                </label>

                <input
                  id={`medication-dosage-${index}`}
                  type="text"
                  value={medication.dosage}
                  onChange={(event) =>
                    updateMedication(
                      index,
                      "dosage",
                      event.target.value,
                    )
                  }
                  placeholder="Enter dosage"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              {/* Frequency */}
              <div>
                <label
                  htmlFor={`medication-frequency-${index}`}
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Frequency
                </label>

                <select
                  id={`medication-frequency-${index}`}
                  value={medication.frequency}
                  onChange={(event) =>
                    updateMedication(
                      index,
                      "frequency",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                >
                  {Object.entries(
                    MEDICATION_FREQUENCY_LABELS,
                  ).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor={`medication-duration-${index}`}
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Duration
                </label>

                <input
                  id={`medication-duration-${index}`}
                  type="text"
                  value={medication.duration}
                  onChange={(event) =>
                    updateMedication(
                      index,
                      "duration",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. 5 days"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={addMedication}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      >
        + Add Medication
      </button>
    </div>
  );
}

export default MedicationForm;