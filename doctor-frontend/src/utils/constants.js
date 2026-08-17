// =========================================================
// RuralCare Doctor Frontend
// Application Constants
// =========================================================

// ---------------------------------------------------------
// User Roles
// ---------------------------------------------------------

export const USER_ROLES = {
  DOCTOR: "doctor",
};

// ---------------------------------------------------------
// Case Status
// ---------------------------------------------------------

export const CASE_STATUS = {
  PENDING: "pending",
  IN_REVIEW: "in_review",
  RESPONDED: "responded",
  CLOSED: "closed",
};

// ---------------------------------------------------------
// Case Status Labels
// ---------------------------------------------------------

export const CASE_STATUS_LABELS = {
  [CASE_STATUS.PENDING]: "Pending",
  [CASE_STATUS.IN_REVIEW]: "In Review",
  [CASE_STATUS.RESPONDED]: "Responded",
  [CASE_STATUS.CLOSED]: "Closed",
};

// ---------------------------------------------------------
// Urgency Levels
// ---------------------------------------------------------

export const URGENCY_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
};

// ---------------------------------------------------------
// Urgency Labels
// ---------------------------------------------------------

export const URGENCY_LABELS = {
  [URGENCY_LEVELS.LOW]: "Low",
  [URGENCY_LEVELS.MEDIUM]: "Medium",
  [URGENCY_LEVELS.HIGH]: "High",
  [URGENCY_LEVELS.CRITICAL]: "Critical",
};

// ---------------------------------------------------------
// Doctor Decision Types
// ---------------------------------------------------------

export const DECISION_TYPES = {
  ADVICE: "advice",
  MEDICATION: "medication",
  REFER: "refer",
  EMERGENCY: "emergency",
};

// ---------------------------------------------------------
// Doctor Decision Labels
// ---------------------------------------------------------

export const DECISION_LABELS = {
  [DECISION_TYPES.ADVICE]: "General Advice",
  [DECISION_TYPES.MEDICATION]: "Medication",
  [DECISION_TYPES.REFER]: "Refer to Specialist",
  [DECISION_TYPES.EMERGENCY]: "Emergency Care",
};

// ---------------------------------------------------------
// Medication Frequency
// ---------------------------------------------------------

export const MEDICATION_FREQUENCIES = {
  ONCE_DAILY: "once_daily",
  TWICE_DAILY: "twice_daily",
  THREE_TIMES_DAILY: "three_times_daily",
  AS_NEEDED: "as_needed",
};

// ---------------------------------------------------------
// Medication Frequency Labels
// ---------------------------------------------------------

export const MEDICATION_FREQUENCY_LABELS = {
  [MEDICATION_FREQUENCIES.ONCE_DAILY]: "Once daily",
  [MEDICATION_FREQUENCIES.TWICE_DAILY]: "Twice daily",
  [MEDICATION_FREQUENCIES.THREE_TIMES_DAILY]: "Three times daily",
  [MEDICATION_FREQUENCIES.AS_NEEDED]: "As needed",
};

// ---------------------------------------------------------
// Storage Keys
// ---------------------------------------------------------

export const STORAGE_KEYS = {
  AUTH: "ruralcare_doctor_auth",
  CASES: "ruralcare_doctor_cases",
};

// ---------------------------------------------------------
// Dashboard Navigation
// ---------------------------------------------------------

export const DOCTOR_ROUTES = {
  LOGIN: "/doctor/login",
  DASHBOARD: "/doctor/dashboard",
  CASES: "/doctor/cases",
  CASE_DETAILS: "/doctor/cases/:caseId",
  HISTORY: "/doctor/history",
};

// ---------------------------------------------------------
// Case Filters
// ---------------------------------------------------------

export const CASE_FILTERS = {
  ALL: "all",
  PENDING: CASE_STATUS.PENDING,
  IN_REVIEW: CASE_STATUS.IN_REVIEW,
  RESPONDED: CASE_STATUS.RESPONDED,
  CLOSED: CASE_STATUS.CLOSED,
};

// ---------------------------------------------------------
// Default Values
// ---------------------------------------------------------

export const DEFAULT_CASE_URGENCY = URGENCY_LEVELS.MEDIUM;

export const DEFAULT_CASE_STATUS = CASE_STATUS.PENDING;