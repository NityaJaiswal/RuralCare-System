import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createCase,
  deleteCase,
  getCaseById,
  getCases,
  saveDoctorResponse,
  updateCase,
  updateCaseStatus,
} from "../services/caseService";

const CaseContext = createContext(null);

export function CaseProvider({ children }) {
  const [cases, setCases] = useState(() => getCases());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // -------------------------------------------------------
  // Refresh cases from the current data source
  // -------------------------------------------------------

  const refreshCases = useCallback(() => {
    try {
      setError(null);
      setCases(getCases());
    } catch (refreshError) {
      setError(refreshError.message);
    }
  }, []);

  // -------------------------------------------------------
  // Keep state synchronized when another browser tab
  // changes the RuralCare case storage.
  // -------------------------------------------------------

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "ruralcare_doctor_cases") {
        refreshCases();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refreshCases]);

  // -------------------------------------------------------
  // Create a new case
  // -------------------------------------------------------

  const addCase = useCallback((caseData) => {
    try {
      setIsLoading(true);
      setError(null);

      const newCase = createCase(caseData);

      setCases((currentCases) => [newCase, ...currentCases]);

      return newCase;
    } catch (createError) {
      setError(createError.message);
      throw createError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // -------------------------------------------------------
  // Get a single case
  // -------------------------------------------------------

  const findCase = useCallback((caseId) => {
    return getCaseById(caseId);
  }, []);

  // -------------------------------------------------------
  // Update a case
  // -------------------------------------------------------

  const editCase = useCallback((caseId, updates) => {
    try {
      setError(null);

      const updatedCase = updateCase(caseId, updates);

      setCases((currentCases) =>
        currentCases.map((caseItem) =>
          caseItem.id === caseId ? updatedCase : caseItem,
        ),
      );

      return updatedCase;
    } catch (updateError) {
      setError(updateError.message);
      throw updateError;
    }
  }, []);

  // -------------------------------------------------------
  // Update case status
  // -------------------------------------------------------

  const changeCaseStatus = useCallback((caseId, status) => {
    try {
      setError(null);

      const updatedCase = updateCaseStatus(caseId, status);

      setCases((currentCases) =>
        currentCases.map((caseItem) =>
          caseItem.id === caseId ? updatedCase : caseItem,
        ),
      );

      return updatedCase;
    } catch (statusError) {
      setError(statusError.message);
      throw statusError;
    }
  }, []);

  // -------------------------------------------------------
  // Save doctor's response
  // -------------------------------------------------------

  const submitDoctorResponse = useCallback(
    (caseId, doctorResponse) => {
      try {
        setError(null);

        const updatedCase = saveDoctorResponse(
          caseId,
          doctorResponse,
        );

        setCases((currentCases) =>
          currentCases.map((caseItem) =>
            caseItem.id === caseId ? updatedCase : caseItem,
          ),
        );

        return updatedCase;
      } catch (responseError) {
        setError(responseError.message);
        throw responseError;
      }
    },
    [],
  );

  // -------------------------------------------------------
  // Delete case
  // -------------------------------------------------------

  const removeCase = useCallback((caseId) => {
    try {
      setError(null);

      deleteCase(caseId);

      setCases((currentCases) =>
        currentCases.filter((caseItem) => caseItem.id !== caseId),
      );
    } catch (deleteError) {
      setError(deleteError.message);
      throw deleteError;
    }
  }, []);

  // -------------------------------------------------------
  // Derived case collections
  // -------------------------------------------------------

  const pendingCases = useMemo(
    () =>
      cases.filter(
        (caseItem) => caseItem.status === "pending",
      ),
    [cases],
  );

  const inReviewCases = useMemo(
    () =>
      cases.filter(
        (caseItem) => caseItem.status === "in_review",
      ),
    [cases],
  );

  const respondedCases = useMemo(
    () =>
      cases.filter(
        (caseItem) => caseItem.status === "responded",
      ),
    [cases],
  );

  const closedCases = useMemo(
    () =>
      cases.filter(
        (caseItem) => caseItem.status === "closed",
      ),
    [cases],
  );

  const value = useMemo(
    () => ({
      cases,
      pendingCases,
      inReviewCases,
      respondedCases,
      closedCases,

      isLoading,
      error,

      refreshCases,
      addCase,
      findCase,
      editCase,
      changeCaseStatus,
      submitDoctorResponse,
      removeCase,
    }),
    [
      cases,
      pendingCases,
      inReviewCases,
      respondedCases,
      closedCases,
      isLoading,
      error,
      refreshCases,
      addCase,
      findCase,
      editCase,
      changeCaseStatus,
      submitDoctorResponse,
      removeCase,
    ],
  );

  return (
    <CaseContext.Provider value={value}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCaseContext() {
  const context = useContext(CaseContext);

  if (!context) {
    throw new Error(
      "useCaseContext must be used inside a CaseProvider.",
    );
  }

  return context;
}