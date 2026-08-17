function ChatTranscript({ messages = [] }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Patient Conversation
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Review the original conversation associated with this case.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No conversation messages are available.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => {
            const isPatient = message.sender === "patient";

            return (
              <div
                key={message.id}
                className={`flex ${
                  isPatient
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 ${
                    isPatient
                      ? "bg-slate-100 text-slate-800"
                      : "bg-slate-900 text-white"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold">
                      {isPatient ? "Patient" : "System"}
                    </span>

                    {message.timestamp && (
                      <span
                        className={`text-[11px] ${
                          isPatient
                            ? "text-slate-500"
                            : "text-slate-300"
                        }`}
                      >
                        {new Date(
                          message.timestamp,
                        ).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-sm leading-6">
                    {message.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ChatTranscript;