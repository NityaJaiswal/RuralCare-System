import { useState } from "react";

import MedicationForm from "./MedicationForm";

import {
  DECISION_LABELS,
  DECISION_TYPES,
} from "../../utils/constants";

function DecisionPanel({
  initialResponse = null,
  onSubmit,
  disabled = false,
}) {
  const [decision, setDecision] = useState(
    initialResponse?.decision ?? "",
  );

  const [advice, setAdvice] = useState(
    initialResponse?.advice ?? "",
  );

  const [precautions, setPrecautions] = useState(
    initialResponse?.precautions?.join("\n") ?? "",
  );

  const [medications, setMedications] = useState(
    initialResponse?.medications ?? [],
  );

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!decision) {
      setError("Please select a decision before submitting.");
      return;
    }

    if (!advice.trim()) {
      setError("Please provide the doctor's response.");
      return;
    }

    const response = {
      decision,
      advice: advice.trim(),

      precautions: precautions
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),

      medications: medications.filter(
        (medication) =>
          medication.name.trim() ||
          medication.dosage.trim() ||
          medication.duration.trim(),
      ),
    };

    onSubmit?.(response);
  };

  const showMedicationForm =
    decision === DECISION_TYPES.MEDICATION;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Doctor's Decision
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Record the final response for this patient case.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Decision */}
        <div>
          <label
            htmlFor="doctor-decision"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Decision
          </label>

          <select
            id="doctor-decision"
            value={decision}
            onChange={(event) =>
              setDecision(event.target.value)
            }
            disabled={disabled}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            <option value="">
              Select a decision
            </option>

            {Object.entries(DECISION_LABELS).map(
              ([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ),
            )}
          </select>
        </div>

        {/* Doctor response */}
        <div>
          <label
            htmlFor="doctor-advice"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Doctor's Response
          </label>

          <textarea
            id="doctor-advice"
            value={advice}
            onChange={(event) =>
              setAdvice(event.target.value)
            }
            disabled={disabled}
            rows={5}
            placeholder="Enter the response that should be communicated to the patient."
            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm leading-6 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        {/* Precautions */}
        <div>
          <label
            htmlFor="doctor-precautions"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Precautions
          </label>

          <textarea
            id="doctor-precautions"
            value={precautions}
            onChange={(event) =>
              setPrecautions(event.target.value)
            }
            disabled={disabled}
            rows={4}
            placeholder="Enter one precaution per line."
            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm leading-6 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <p className="mt-1.5 text-xs text-slate-500">
            Enter each precaution on a separate line.
          </p>
        </div>

        {/* Medication */}
        {showMedicationForm && (
          <div>
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-slate-800">
                Medication
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Add medication details when applicable.
              </p>
            </div>

            <MedicationForm
              medications={medications}
              onChange={setMedications}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end border-t border-slate-100 pt-5">
          <button
            type="submit"
            disabled={disabled}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Doctor Response
          </button>
        </div>
      </form>
    </section>
  );
}

export default DecisionPanel;