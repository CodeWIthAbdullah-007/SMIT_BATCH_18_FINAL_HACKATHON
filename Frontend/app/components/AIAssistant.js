
"use client";

import { useState } from "react";

export default function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();

    const text = question.trim();

    if (!text || loading) return;

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        text,
        sender: "user",
      },
    ]);

    setQuestion("");
    setNotice(
      "Your message is saved in this chat, but the AI service is not connected yet. Connect the backend to receive AI-generated answers."
    );
  };

  const clearChat = () => {
    setMessages([]);
    setNotice("");
    setQuestion("");
    setLoading(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            AI Assistant
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Get help with HR tasks and workplace questions.
          </p>
        </div>

        <button
          type="button"
          onClick={clearChat}
          disabled={messages.length === 0 && !notice}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear Chat
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-200 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">
            AI
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              HCM Lite Assistant
            </h2>
            <p className="text-sm text-slate-500">
              HR support and guidance
            </p>
          </div>
        </div>

        <div className="min-h-[350px] space-y-4 bg-slate-50 p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-slate-900 shadow-sm">
                AI
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                How can I help you?
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Ask about attendance policies, leave management, payroll
                procedures or other HR-related topics.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {[
                  "Explain the leave policy",
                  "How does attendance work?",
                  "What is payroll?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuestion(suggestion)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[75%] ${
                    message.sender === "user"
                      ? "rounded-br-sm bg-slate-900 text-white"
                      : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))
          )}

          {notice && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
              {notice}
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="border-t border-slate-200 p-4">
          <label
            htmlFor="assistant-question"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Your question
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="assistant-question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your HR question..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
            />

            <button
              type="submit"
              disabled={!question.trim() || loading}
              className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send Message
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            AI-generated responses will be available after backend integration.
          </p>
        </form>
      </div>
    </section>
  );
}
