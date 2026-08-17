import {
  CASE_STATUS,
  URGENCY_LEVELS,
} from "./constants";

export const SEED_CASES = [
  {
    id: "RC-DEMO-001",
    status: CASE_STATUS.PENDING,
    urgency: URGENCY_LEVELS.HIGH,
    createdAt: "2026-08-17T08:30:00.000Z",
    updatedAt: "2026-08-17T08:30:00.000Z",

    patient: {
      id: "PAT-DEMO-001",
      name: "Demo Patient A",
      age: 42,
      gender: "Female",
      contact: "Not available in demo",
    },

    symptoms: [
      "Fever",
      "Headache",
      "General weakness",
    ],

    aiSummary: {
      summary:
        "The patient reported fever, headache, and general weakness. The available conversation indicates that symptoms have persisted and require clinician review.",

      possibleConditions: [
        "Requires clinical assessment",
      ],

      recommendations: [
        "Review the complete patient conversation.",
        "Review the reported symptoms and available information before making a decision.",
      ],
    },

    chatTranscript: [
      {
        id: "MSG-001-01",
        sender: "patient",
        message:
          "I have had fever and headache since yesterday.",
        timestamp: "2026-08-17T08:10:00.000Z",
      },
      {
        id: "MSG-001-02",
        sender: "patient",
        message:
          "I also feel weak and tired.",
        timestamp: "2026-08-17T08:12:00.000Z",
      },
      {
        id: "MSG-001-03",
        sender: "patient",
        message:
          "I wanted to consult a doctor through RuralCare.",
        timestamp: "2026-08-17T08:15:00.000Z",
      },
    ],

    images: [],

    doctorResponse: null,
  },

  {
    id: "RC-DEMO-002",
    status: CASE_STATUS.IN_REVIEW,
    urgency: URGENCY_LEVELS.MEDIUM,
    createdAt: "2026-08-17T07:45:00.000Z",
    updatedAt: "2026-08-17T09:00:00.000Z",

    patient: {
      id: "PAT-DEMO-002",
      name: "Demo Patient B",
      age: 29,
      gender: "Male",
      contact: "Not available in demo",
    },

    symptoms: [
      "Cough",
      "Sore throat",
    ],

    aiSummary: {
      summary:
        "The patient reported cough and sore throat. The available information is presented for doctor review.",

      possibleConditions: [
        "Requires clinical assessment",
      ],

      recommendations: [
        "Review the patient's complete conversation.",
        "Assess whether further evaluation is required.",
      ],
    },

    chatTranscript: [
      {
        id: "MSG-002-01",
        sender: "patient",
        message:
          "I have been coughing since yesterday.",
        timestamp: "2026-08-17T07:20:00.000Z",
      },
      {
        id: "MSG-002-02",
        sender: "patient",
        message:
          "My throat also hurts when I swallow.",
        timestamp: "2026-08-17T07:23:00.000Z",
      },
    ],

    images: [],

    doctorResponse: null,
  },

  {
    id: "RC-DEMO-003",
    status: CASE_STATUS.RESPONDED,
    urgency: URGENCY_LEVELS.LOW,
    createdAt: "2026-08-16T11:20:00.000Z",
    updatedAt: "2026-08-16T13:10:00.000Z",

    patient: {
      id: "PAT-DEMO-003",
      name: "Demo Patient C",
      age: 35,
      gender: "Female",
      contact: "Not available in demo",
    },

    symptoms: [
      "Mild skin irritation",
    ],

    aiSummary: {
      summary:
        "The patient reported a mild skin irritation and submitted the case for doctor review.",

      possibleConditions: [
        "Requires clinical assessment",
      ],

      recommendations: [
        "Review the submitted information and image if available.",
      ],
    },

    chatTranscript: [
      {
        id: "MSG-003-01",
        sender: "patient",
        message:
          "I noticed some irritation on my skin.",
        timestamp: "2026-08-16T11:00:00.000Z",
      },
      {
        id: "MSG-003-02",
        sender: "patient",
        message:
          "It started recently and I wanted a doctor's opinion.",
        timestamp: "2026-08-16T11:05:00.000Z",
      },
    ],

    images: [],

    doctorResponse: {
      decision: "advice",
      advice:
        "Demo response recorded for testing the RuralCare doctor workflow.",
      precautions: [
        "Demo precaution",
      ],
      medications: [],
      submittedAt: "2026-08-16T13:10:00.000Z",
    },
  },
];