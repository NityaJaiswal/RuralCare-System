// =========================================================
// RuralCare Doctor Frontend
// Local Storage Service
//
// Current stage:
// - Persists doctor-side case data in localStorage.
// - No backend/API integration.
//
// This service keeps browser storage logic separate from
// the rest of the application.
// =========================================================

import { STORAGE_KEYS } from "../utils/constants";
import { SEED_CASES } from "../utils/seedCases";

// ---------------------------------------------------------
// Internal JSON reader
// ---------------------------------------------------------

function readJson(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return fallback;
    }

    return JSON.parse(storedValue);
  } catch {
    return fallback;
  }
}

// ---------------------------------------------------------
// Internal JSON writer
// ---------------------------------------------------------

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------------------------------------------------------
// Cases
// ---------------------------------------------------------

export function getStoredCases() {
  const storedCases = readJson(STORAGE_KEYS.CASES, null);

  if (storedCases === null) {
    const initialCases = structuredClone(SEED_CASES);

    saveStoredCases(initialCases);

    return initialCases;
  }

  return Array.isArray(storedCases) ? storedCases : [];
}

export function saveStoredCases(cases) {
  if (!Array.isArray(cases)) {
    throw new Error("Cases must be stored as an array.");
  }

  writeJson(STORAGE_KEYS.CASES, cases);
}

// ---------------------------------------------------------
// Clear all stored cases
// ---------------------------------------------------------

export function clearStoredCases() {
  localStorage.removeItem(STORAGE_KEYS.CASES);
}

// ---------------------------------------------------------
// Generic storage helpers
//
// These are kept available for future local-only features
// without exposing localStorage directly throughout the UI.
// ---------------------------------------------------------

export function getStoredValue(key, fallback = null) {
  return readJson(key, fallback);
}

export function setStoredValue(key, value) {
  writeJson(key, value);
}

export function removeStoredValue(key) {
  localStorage.removeItem(key);
}