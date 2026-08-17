import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCase } from "../context/CaseContext";

function generateDoctorPlan(symptoms = "") {
  const text = symptoms.toLowerCase();

  /*
    These are MOCK doctor-review responses for frontend testing.
    Real assessment, medication and follow-up information
    will come from the backend/doctor system later.
  */

  if (
    text.includes("fever") &&
    (text.includes("cough") || text.includes("cold"))
  ) {
    return {
      assessment:
        "The reported symptoms indicate a fever associated with respiratory symptoms. The patient should continue monitoring the condition and seek medical attention if symptoms become severe or persistent.",

      precautions: [
        "Rest adequately and avoid excessive physical activity.",
        "Drink sufficient fluids to maintain hydration.",
        "Monitor body temperature and changes in symptoms.",
        "Seek urgent medical attention if breathing difficulty or chest pain develops.",
      ],

      medications: [
        {
          name: "Doctor-directed treatment",
          instructions:
            "Follow the medication and dosage prescribed by the reviewing doctor.",
        },
        {
          name: "Symptom management",
          instructions:
            "Use only treatments recommended by your healthcare professional.",
        },
      ],

      followUp: [
        "Monitor fever and respiratory symptoms.",
        "Follow the reviewing doctor's treatment instructions.",
        "Return for medical review if symptoms worsen or do not improve.",
      ],
    };
  }

  if (text.includes("headache") || text.includes("head pain")) {
    return {
      assessment:
        "The reported symptoms are consistent with a headache presentation. The patient should monitor the severity, duration and any changes in associated symptoms.",

      precautions: [
        "Rest in a quiet and comfortable environment.",
        "Maintain adequate hydration.",
        "Avoid activities or triggers that appear to worsen the headache.",
        "Seek medical attention if the headache becomes sudden, severe or unusual.",
      ],

      medications: [
        {
          name: "Doctor-directed treatment",
          instructions:
            "Follow the medication and dosage prescribed by the reviewing doctor.",
        },
        {
          name: "Symptom management",
          instructions:
            "Do not start or change medication without professional medical guidance.",
        },
      ],

      followUp: [
        "Monitor headache frequency and severity.",
        "Follow the reviewing doctor's instructions.",
        "Seek further evaluation if headaches become frequent, severe or persistent.",
      ],
    };
  }

  if (
    text.includes("sore throat") ||
    text.includes("throat pain")
  ) {
    return {
      assessment:
        "The reported symptoms include throat discomfort. The patient should monitor the progression of symptoms and watch for difficulty swallowing or breathing.",

      precautions: [
        "Drink sufficient fluids.",
        "Rest adequately.",
        "Monitor throat discomfort and associated symptoms.",
        "Seek medical attention if difficulty breathing or swallowing develops.",
      ],

      medications: [
        {
          name: "Doctor-directed treatment",
          instructions:
            "Follow the medication and dosage prescribed by the reviewing doctor.",
        },
        {
          name: "Symptom management",
          instructions:
            "Use only treatments recommended by your healthcare professional.",
        },
      ],

      followUp: [
        "Monitor the progression of throat symptoms.",
        "Follow the reviewing doctor's treatment instructions.",
        "Return for medical review if symptoms worsen or persist.",
      ],
    };
  }

  if (
    text.includes("stomach") ||
    text.includes("abdominal") ||
    text.includes("vomit") ||
    text.includes("nausea")
  ) {
    return {
      assessment:
        "The reported symptoms involve gastrointestinal discomfort. The patient should monitor symptoms carefully and maintain adequate hydration.",

      precautions: [
        "Drink sufficient fluids.",
        "Rest adequately.",
        "Monitor for worsening abdominal pain, vomiting or other changes.",
        "Seek medical attention if severe or persistent symptoms develop.",
      ],

      medications: [
        {
          name: "Doctor-directed treatment",
          instructions:
            "Follow the medication and dosage prescribed by the reviewing doctor.",
        },
        {
          name: "Symptom management",
          instructions:
            "Do not start or change medication without professional medical guidance.",
        },
      ],

      followUp: [
        "Monitor gastrointestinal symptoms.",
        "Follow the reviewing doctor's instructions.",
        "Return for medical review if symptoms worsen or fail to improve.",
      ],
    };
  }

  if (
    text.includes("pain") ||
    text.includes("hurt")
  ) {
    return {
      assessment:
        "The reported symptoms include pain. Further clinical evaluation may be required depending on the location, severity and duration of the pain.",

      precautions: [
        "Rest the affected area when appropriate.",
        "Monitor the severity and progression of the pain.",
        "Avoid activities that significantly worsen the symptoms.",
        "Seek medical attention if severe or rapidly worsening pain develops.",
      ],

      medications: [
        {
          name: "Doctor-directed treatment",
          instructions:
            "Follow the medication and dosage prescribed by the reviewing doctor.",
        },
        {
          name: "Symptom management",
          instructions:
            "Do not start or change medication without professional medical guidance.",
        },
      ],

      followUp: [
        "Monitor pain severity and duration.",
        "Follow the reviewing doctor's instructions.",
        "Seek further medical evaluation if the pain persists or worsens.",
      ],
    };
  }

  return {
    assessment:
      "The reported symptoms have been reviewed based on the information provided during the consultation. Further clinical evaluation may be required to determine the appropriate diagnosis and treatment.",

    precautions: [
      "Rest adequately.",
      "Drink sufficient fluids.",
      "Monitor your symptoms and note any changes.",
      "Seek medical attention if symptoms become severe or worsen.",
    ],

    medications: [
      {
        name: "Doctor-directed treatment",
        instructions:
          "Follow the medication and dosage prescribed by the reviewing doctor.",
      },
      {
        name: "Symptom management",
        instructions:
          "Do not start or change medication without professional medical guidance.",
      },
    ],

    followUp: [
      "Continue monitoring your symptoms.",
      "Follow the reviewing doctor's instructions.",
      "Return for medical review if symptoms worsen or persist.",
    ],
  };
}

function DoctorPlan() {
  const {
    currentCase,
    saveCase,
  } = useCase();

  /*
    Generate the mock doctor plan only when this case
    does not already have one.
  */
  useEffect(() => {
    if (
      currentCase &&
      !currentCase.doctorPlan
    ) {
      const generatedPlan = generateDoctorPlan(
        currentCase.symptoms
      );

      saveCase({
        ...currentCase,
        doctorPlan: generatedPlan,
        status: "Doctor Plan Ready",
      });
    }
  }, [currentCase, saveCase]);

  /*
    Use the saved plan if it exists.
    Otherwise generate a temporary plan for display.
  */
  const doctorPlan =
    currentCase?.doctorPlan ||
    generateDoctorPlan(
      currentCase?.symptoms || ""
    );

  /*
    Download / Share
  */
  const handleDownloadShare = async () => {
    const symptoms =
      currentCase?.symptoms ||
      "Symptoms recorded during consultation";

    const planText = `
RURALCARE
Doctor's Consultation Plan

Case ID:
${currentCase?.id || "Not available"}

Symptoms:
${symptoms}

DOCTOR'S ASSESSMENT
${doctorPlan.assessment}

PRECAUTIONS
${doctorPlan.precautions
  .map((item) => `• ${item}`)
  .join("\n")}

MEDICATION
${doctorPlan.medications
  .map(
    (item) =>
      `• ${item.name}\n  ${item.instructions}`
  )
  .join("\n")}

FOLLOW-UP
${doctorPlan.followUp
  .map((item) => `• ${item}`)
  .join("\n")}

This is a frontend demonstration of the RuralCare
consultation workflow. Treatment and medication
information must be confirmed by a qualified doctor.
`;

    /*
      If the browser supports native sharing,
      use it.
    */
    if (
      navigator.share &&
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      )
    ) {
      try {
        await navigator.share({
          title: "RuralCare Doctor's Plan",
          text: planText,
        });

        return;
      } catch (error) {
        /*
          User may simply cancel the share dialog.
          No error message is necessary.
        */
        if (error.name === "AbortError") {
          return;
        }
      }
    }

    /*
      Desktop / unsupported browsers:
      download the consultation plan as a .txt file.
    */
    const blob = new Blob(
      [planText],
      {
        type: "text/plain;charset=utf-8",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `RuralCare-Case-${currentCase?.id || "Plan"}.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">

        <div
          className="max-w-6xl mx-auto px-4 sm:px-6
                     py-4 flex items-center
                     justify-between gap-4"
        >

          <Link
            to="/home"
            className="text-2xl font-bold text-emerald-700"
          >
            RuralCare
          </Link>

          <span className="text-sm text-slate-500">
            Doctor's Plan
          </span>

        </div>

      </header>

      <main
        className="max-w-4xl mx-auto
                   px-4 sm:px-6 py-8 sm:py-10"
      >

        {/* Page Heading */}
        <div className="mb-8">

          <p className="text-sm font-medium text-emerald-600">
            Consultation Result
          </p>

          <h1
            className="text-3xl sm:text-4xl
                       font-bold text-slate-800 mt-2"
          >
            Doctor's Plan
          </h1>

          <p className="text-slate-500 mt-3">
            Your reviewing doctor has provided the
            following care plan.
          </p>

          {currentCase?.id && (
            <p className="text-xs text-emerald-600 mt-3">
              Case ID: {currentCase.id}
            </p>
          )}

        </div>

        {/* Symptoms */}
        {currentCase?.symptoms && (
          <section
            className="bg-emerald-50
                       border border-emerald-100
                       rounded-2xl p-6 mb-5"
          >

            <h2
              className="text-lg font-semibold
                         text-slate-800 mb-3"
            >
              Reported Symptoms
            </h2>

            <p className="text-slate-700 leading-relaxed">
              {currentCase.symptoms}
            </p>

          </section>
        )}

        {/* Doctor Assessment */}
        <section
          className="bg-white border border-slate-200
                     rounded-2xl shadow-sm p-6 mb-5"
        >

          <h2
            className="text-lg font-semibold
                       text-slate-800 mb-3"
          >
            Doctor's Assessment
          </h2>

          <p className="text-slate-600 leading-relaxed">
            {doctorPlan.assessment}
          </p>

        </section>

        {/* Precautions */}
        <section
          className="bg-white border border-slate-200
                     rounded-2xl shadow-sm p-6 mb-5"
        >

          <h2
            className="text-lg font-semibold
                       text-slate-800 mb-4"
          >
            Precautions
          </h2>

          <ul className="space-y-3 text-slate-600">

            {doctorPlan.precautions.map(
              (item, index) => (
                <li
                  key={index}
                  className="flex gap-3"
                >
                  <span className="text-emerald-600">
                    •
                  </span>

                  <span>{item}</span>
                </li>
              )
            )}

          </ul>

        </section>

        {/* Medication */}
        <section
          className="bg-white border border-slate-200
                     rounded-2xl shadow-sm p-6 mb-5"
        >

          <h2
            className="text-lg font-semibold
                       text-slate-800 mb-4"
          >
            Medication
          </h2>

          <div className="space-y-4">

            {doctorPlan.medications.map(
              (medication, index) => (

                <div
                  key={index}
                  className="p-4 bg-slate-50
                             rounded-xl"
                >

                  <p
                    className="font-semibold
                               text-slate-700"
                  >
                    {medication.name}
                  </p>

                  <p
                    className="text-sm
                               text-slate-500 mt-1"
                  >
                    {medication.instructions}
                  </p>

                </div>

              )
            )}

          </div>

        </section>

        {/* Follow-up */}
        <section
          className="bg-white border border-slate-200
                     rounded-2xl shadow-sm p-6 mb-6"
        >

          <h2
            className="text-lg font-semibold
                       text-slate-800 mb-4"
          >
            Follow-up
          </h2>

          <ul className="space-y-3 text-slate-600">

            {doctorPlan.followUp.map(
              (item, index) => (
                <li
                  key={index}
                  className="flex gap-3"
                >
                  <span className="text-emerald-600">
                    •
                  </span>

                  <span>{item}</span>
                </li>
              )
            )}

          </ul>

        </section>

        {/* Actions */}
        <div
          className="flex flex-col
                     sm:flex-row gap-3"
        >

          <button
            type="button"
            onClick={handleDownloadShare}
            className="flex-1 bg-emerald-600
                       hover:bg-emerald-700
                       text-white font-semibold
                       py-3 rounded-xl
                       transition"
          >
            Download / Share
          </button>

          <Link
            to="/history"
            className="flex-1 text-center
                       border border-slate-300
                       hover:border-emerald-500
                       hover:text-emerald-600
                       text-slate-700
                       font-semibold py-3
                       rounded-xl transition"
          >
            View Case History
          </Link>

        </div>

        <p
          className="text-xs text-slate-400
                     text-center mt-6 leading-relaxed"
        >
          This page currently demonstrates the
          frontend consultation workflow. In the
          integrated system, assessment and treatment
          information will be provided by the reviewing
          doctor/backend.
        </p>

      </main>

    </div>
  );
}

export default DoctorPlan;