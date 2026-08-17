import {
  CASE_STATUS,
  DEFAULT_CASE_STATUS,
  DEFAULT_CASE_URGENCY,
} from "../utils/constants";
import {
  getStoredCases,
  saveStoredCases,
} from "./storageService";

// =========================================================
// RuralCare Doctor Frontend
// Local Case Service
//
// Current stage:
// - Uses localStorage
// - No backend/API integration
//
// Future stage:
// - This service becomes the API boundary.
// - Components should not need to know whether data comes
//   from localStorage or the backend.
// =========================================================

// ---------------------------------------------------------
// Create a case
// ---------------------------------------------------------

export function createCase(caseData) {
  const cases = getStoredCases();

  const newCase = {
    id: caseData.id ?? crypto.randomUUID(),

    status: caseData.status ?? DEFAULT_CASE_STATUS,

    urgency: caseData.urgency ?? DEFAULT_CASE_URGENCY,

    createdAt: caseData.createdAt ?? new Date().toISOString(),

    updatedAt: new Date().toISOString(),

    patient: {
      id: caseData.patient?.id ?? "",
      name: caseData.patient?.name ?? "",
      age: caseData.patient?.age ?? null,
      gender: caseData.patient?.gender ?? "",
      contact: caseData.patient?.contact ?? "",
    },

    symptoms: caseData.symptoms ?? [],

    aiSummary: {
      summary: caseData.aiSummary?.summary ?? "",
      possibleConditions: caseData.aiSummary?.possibleConditions ?? [],
      recommendations: caseData.aiSummary?.recommendations ?? [],
    },

    chatTranscript: caseData.chatTranscript ?? [],

    images: caseData.images ?? [],

    doctorResponse: caseData.doctorResponse ?? null,
  };

  const updatedCases = [newCase, ...cases];

  saveStoredCases(updatedCases);

  return newCase;
}

// ---------------------------------------------------------
// Get all cases
// ---------------------------------------------------------

export function getCases() {
  return getStoredCases();
}

// ---------------------------------------------------------
// Get one case
// ---------------------------------------------------------

export function getCaseById(caseId) {
  const cases = getStoredCases();

  return cases.find((caseItem) => caseItem.id === caseId) ?? null;
}

// ---------------------------------------------------------
// Update a case
// ---------------------------------------------------------

export function updateCase(caseId, updates) {
  const cases = getStoredCases();

  const updatedCases = cases.map((caseItem) => {
    if (caseItem.id !== caseId) {
      return caseItem;
    }

    return {
      ...caseItem,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
  });

  saveStoredCases(updatedCases);

  return updatedCases.find((caseItem) => caseItem.id === caseId) ?? null;
}

// ---------------------------------------------------------
// Save doctor's response
// ---------------------------------------------------------

export function saveDoctorResponse(caseId, doctorResponse) {
  return updateCase(caseId, {
    status: CASE_STATUS.RESPONDED,
    doctorResponse: {
      ...doctorResponse,
      submittedAt: new Date().toISOString(),
    },
  });
}

// ---------------------------------------------------------
// Update case status
// ---------------------------------------------------------

export function updateCaseStatus(caseId, status) {
  return updateCase(caseId, {
    status,
  });
}

// ---------------------------------------------------------
// Delete a case
// ---------------------------------------------------------

export function deleteCase(caseId) {
  const cases = getStoredCases();

  const updatedCases = cases.filter(
    (caseItem) => caseItem.id !== caseId,
  );

  saveStoredCases(updatedCases);
}