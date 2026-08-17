import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CaseContext = createContext(null);

const EMPTY_CASE = {
  id: null,
  symptoms: "",
  photo: null,
  messages: [],
  status: "draft",
  aiSummary: null,
  doctorResponse: null,
  doctorPlan: null,
};

export function CaseProvider({ children }) {
  const [currentCase, setCurrentCase] = useState(EMPTY_CASE);

  const [cases, setCases] = useState(() => {
    try {
      const savedCases = localStorage.getItem("ruralcare_cases");

      return savedCases
        ? JSON.parse(savedCases)
        : [];
    } catch (error) {
      console.error("Unable to load saved cases:", error);
      return [];
    }
  });

  /* Save cases whenever the list changes */
  useEffect(() => {
    try {
      localStorage.setItem(
        "ruralcare_cases",
        JSON.stringify(cases)
      );
    } catch (error) {
      console.error("Unable to save cases:", error);
    }
  }, [cases]);

  /* Update the currently active case */
  const updateCase = (updates) => {
    setCurrentCase((previousCase) => ({
      ...previousCase,
      ...updates,
    }));
  };

  /* Create a new consultation */
  const startNewCase = () => {
    const newCase = {
      ...EMPTY_CASE,
      id: Date.now().toString().slice(-6),
    };

    setCurrentCase(newCase);

    return newCase;
  };

  /* Save completed consultation */
  const saveCase = (caseData = currentCase) => {
    const caseToSave = {
      ...caseData,

      id:
        caseData.id ||
        Date.now().toString().slice(-6),

      date:
        caseData.date ||
        new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),

      status:
        caseData.status === "draft"
          ? "Reviewed"
          : caseData.status,
    };

    setCases((previousCases) => {
      const existingCase = previousCases.find(
        (item) => item.id === caseToSave.id
      );

      if (existingCase) {
        return previousCases.map((item) =>
          item.id === caseToSave.id
            ? caseToSave
            : item
        );
      }

      return [
        caseToSave,
        ...previousCases,
      ];
    });

    setCurrentCase(caseToSave);

    return caseToSave;
  };

  /* Get a specific saved case */
  const getCaseById = (caseId) => {
    return cases.find(
      (item) => String(item.id) === String(caseId)
    );
  };

  /* Reset current consultation */
  const resetCase = () => {
    setCurrentCase({
      ...EMPTY_CASE,
    });
  };

  return (
    <CaseContext.Provider
      value={{
        currentCase,
        cases,
        updateCase,
        startNewCase,
        saveCase,
        getCaseById,
        resetCase,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const context = useContext(CaseContext);

  if (!context) {
    throw new Error(
      "useCase must be used inside CaseProvider"
    );
  }

  return context;
}