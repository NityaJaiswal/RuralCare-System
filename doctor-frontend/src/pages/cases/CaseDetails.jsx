import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";

import PatientSummary from "../../components/cases/PatientSummary";
import AISummary from "../../components/cases/AISummary";
import ChatTranscript from "../../components/cases/ChatTranscript";
import CaseImages from "../../components/cases/CaseImages";

import DecisionPanel from "../../components/decision/DecisionPanel";

import useCases from "../../hooks/useCases";

import {
  CASE_STATUS,
  CASE_STATUS_LABELS,
  URGENCY_LABELS,
} from "../../utils/constants";

function CaseDetails() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const {
    cases,
    loading,
    error,
    submitDoctorResponse,
  } = useCases();

  const [responseSubmitted, setResponseSubmitted] =
    useState(false);

  const [submittedResponse, setSubmittedResponse] =
    useState(null);

  const [submitError, setSubmitError] = useState("");

  const caseItem = useMemo(
    () =>
      cases.find(
        (currentCase) =>
          String(currentCase.id) === String(caseId),
      ),
    [cases, caseId],
  );

  if (loading) {
    return (
      <div className="p-6">
        <LoadingState message="Loading case details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <EmptyState
          title="Unable to load case"
          description={error}
          action={
            <button
              type="button"
              onClick={() => navigate("/cases")}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Back to Cases
            </button>
          }
        />
      </div>
    );
  }

  if (!caseItem) {
    return (
      <div className="p-6">
        <EmptyState
          title="Case not found"
          description="The requested case could not be found."
          action={
            <button
              type="button"
              onClick={() => navigate("/cases")}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Back to Cases
            </button>
          }
        />
      </div>
    );
  }

  const handleSubmitResponse = async (response) => {
    setSubmitError("");

    try {
      const updatedCase = await submitDoctorResponse(
        caseItem.id,
        response,
      );

      setSubmittedResponse(
        updatedCase?.doctorResponse || response,
      );

      setResponseSubmitted(true);
    } catch (submissionError) {
      setSubmitError(
        submissionError?.message ||
          "Unable to save the doctor's response.",
      );
    }
  };

  const doctorResponse =
    submittedResponse ||
    caseItem.doctorResponse ||
    null;

  const isResponded =
    caseItem.status === CASE_STATUS.RESPONDED ||
    responseSubmitted;

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={`Case ${caseItem.id}`}
        description="Review the patient information, AI-assisted summary, conversation, and submitted images before providing the final doctor response."
        breadcrumb="Cases / Case Details"
        action={
          <button
            type="button"
            onClick={() => navigate("/cases")}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Back to Cases
          </button>
        }
      />

      {/* Case overview */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Case Overview
            </p>

            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {caseItem.title ||
                caseItem.patient?.name ||
                "Patient Case"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
              {CASE_STATUS_LABELS[caseItem.status] ||
                "Unknown status"}
            </span>

            <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800">
              {URGENCY_LABELS[caseItem.urgency] ||
                "Unknown urgency"}
            </span>
          </div>
        </div>

        {caseItem.symptoms?.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Reported Symptoms
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {caseItem.symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <PatientSummary patient={caseItem.patient} />

      <AISummary aiSummary={caseItem.aiSummary} />

      <ChatTranscript
        messages={caseItem.messages || []}
      />

      <CaseImages images={caseItem.images || []} />

      {/* Previously submitted response */}
      {isResponded && doctorResponse && (
        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              ✓
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-emerald-900">
                Doctor Response Submitted
              </h2>

              <p className="mt-1 text-sm text-emerald-800">
                The response for this case has been saved successfully.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4 rounded-xl border border-emerald-200 bg-white p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Decision
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {doctorResponse.decision || "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Doctor's Response
              </p>

              <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {doctorResponse.advice || "Not provided"}
              </p>
            </div>

            {doctorResponse.precautions?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Precautions
                </p>

                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {doctorResponse.precautions.map(
                    (precaution) => (
                      <li key={precaution}>
                        {precaution}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {doctorResponse.medications?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Medication
                </p>

                <div className="mt-2 space-y-2">
                  {doctorResponse.medications.map(
                    (medication, index) => (
                      <div
                        key={`${medication.name}-${index}`}
                        className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700"
                      >
                        <p className="font-semibold text-slate-900">
                          {medication.name}
                        </p>

                        <p className="mt-1">
                          {medication.dosage || "Dosage not specified"}
                          {" • "}
                          {medication.frequency || "Frequency not specified"}
                          {" • "}
                          {medication.duration || "Duration not specified"}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Doctor response form */}
      {!isResponded && (
        <>
          {submitError && (
            <div
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              {submitError}
            </div>
          )}

          <DecisionPanel
            onSubmit={handleSubmitResponse}
          />
        </>
      )}
    </div>
  );
}

export default CaseDetails;