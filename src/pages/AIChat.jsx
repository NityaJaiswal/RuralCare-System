import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";

function AIChat() {
  const navigate = useNavigate();
  const {
  currentCase,
  updateCase,
  saveCase,
  } = useCase();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm the RuralCare AI assistant. I'll ask you a few questions to better understand your symptoms.",
    },
    {
      id: 2,
      sender: "ai",
      text: "When did your symptoms first start?",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const generateAIResponse = (patientMessage) => {
    const lowerMessage = patientMessage.toLowerCase();

    if (
      lowerMessage.includes("fever") ||
      lowerMessage.includes("temperature")
    ) {
      return "Thank you. Have you measured your temperature? If yes, please tell me the approximate temperature.";
    }

    if (
      lowerMessage.includes("pain") ||
      lowerMessage.includes("hurt")
    ) {
      return "I understand. Can you tell me where the pain is located and how severe it feels on a scale from 1 to 10?";
    }

    if (
      lowerMessage.includes("cough") ||
      lowerMessage.includes("cold")
    ) {
      return "Thank you for sharing that. Do you also have difficulty breathing, chest pain, or a sore throat?";
    }

    if (
      lowerMessage.includes("yes") ||
      lowerMessage.includes("no")
    ) {
      return "Thank you. Are there any other symptoms or changes in your condition that you think I should know about?";
    }

    return "Thank you for sharing that. Could you tell me a little more about when this started and whether your symptoms are getting better, worse, or staying the same?";
  };

  const handleSend = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isTyping) {
      return;
    }

    const patientMessage = {
      id: Date.now(),
      sender: "patient",
      text: trimmedMessage,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      patientMessage,
    ]);

    setMessage("");
    setIsTyping(true);

    const aiResponse = generateAIResponse(trimmedMessage);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: aiResponse,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);

      setIsTyping(false);
    }, 1200);
  };

  const handleFinishConsultation = () => {
    const completedCase = {
      ...currentCase,
      messages,
      status: "Reviewed",
      aiSummary: {
        status: "Generated",
        note: "AI-generated consultation summary is ready for doctor review.",
      },
    };

    saveCase(completedCase);

    navigate("/consultation/ai-reviewing");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto w-full px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-xl font-bold text-emerald-700">
              RuralCare
            </h1>

            <p className="text-xs text-slate-500">
              AI-Assisted Consultation
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            AI Assistant
          </div>

        </div>
      </header>

      {/* Chat */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">

        <div className="bg-white border border-slate-200
                        rounded-2xl shadow-sm overflow-hidden">

          {/* Chat title */}
          <div className="px-5 sm:px-6 py-4 border-b border-slate-200">

            <h2 className="font-semibold text-slate-800">
              Consultation Chat
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Answer the questions as accurately as possible.
            </p>

            {currentCase.id && (
              <p className="text-xs text-emerald-600 mt-2">
                Case ID: {currentCase.id}
              </p>
            )}

          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-4 sm:p-6 space-y-5">

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "patient"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%]
                              px-4 py-3 rounded-2xl ${
                    msg.sender === "patient"
                      ? "bg-emerald-600 text-white rounded-br-md"
                      : "bg-slate-100 text-slate-700 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-500
                                px-4 py-3 rounded-2xl rounded-bl-md">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce [animation-delay:150ms]">
                      ●
                    </span>
                    <span className="animate-bounce [animation-delay:300ms]">
                      ●
                    </span>
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="border-t border-slate-200 p-4 flex flex-col sm:flex-row gap-3"
          >

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your response..."
              disabled={isTyping}
              className="flex-1 px-4 py-3 border border-slate-300
                         rounded-xl focus:outline-none
                         focus:ring-2 focus:ring-emerald-500
                         disabled:bg-slate-100"
            />

            <button
              type="submit"
              disabled={!message.trim() || isTyping}
              className="px-6 py-3 bg-emerald-600 text-white
                         font-semibold rounded-xl
                         hover:bg-emerald-700
                         disabled:bg-slate-300
                         disabled:cursor-not-allowed
                         transition"
            >
              {isTyping ? "Thinking..." : "Send"}
            </button>

          </form>

          {/* Finish */}
          <div className="px-4 pb-4">

            <button
              type="button"
              onClick={handleFinishConsultation}
              disabled={isTyping}
              className="w-full px-6 py-3 border border-emerald-600
                         text-emerald-700 font-semibold rounded-xl
                         hover:bg-emerald-50 transition
                         disabled:border-slate-300
                         disabled:text-slate-400
                         disabled:cursor-not-allowed"
            >
              Finish Consultation
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AIChat;