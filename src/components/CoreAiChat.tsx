"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: number;
  role: "agent" | "user";
  content: string;
  tone?: "gold" | "neon";
};

type Locale = "tr" | "en";

const chatCopy = {
  tr: {
    label: "Çekirdek yapay zekâ sohbet arayüzü",
    sidebarLabel: "Aktif ajan protokolleri",
    status: "[ÇEVRİMİÇİ]",
    inputLabel: "Komut çalıştır veya ajana soru sor",
    placeholder: "Komut çalıştır veya ajana soru sor...",
    submit: "ÇALIŞTIR",
    response:
      "[AI_LOG] Komut alındı. Niyet, SYSTEM_CORE_AGENT_V1.0.md protokol katmanına yönlendiriliyor.",
    messages: [
      {
        id: 1,
        role: "agent",
        content: "[AI_LOG] Root_Agent başlatıldı. Ajan işletim geçidi hazır.",
        tone: "neon",
      },
      {
        id: 2,
        role: "agent",
        content: "[AI_LOG] Bellek katmanı: Supabase çekirdek bağlantısı bekleniyor.",
        tone: "gold",
      },
      {
        id: 3,
        role: "agent",
        content: "[AI_LOG] Çalışma hatları: strateji, kod, finans, denetim.",
        tone: "neon",
      },
      {
        id: 4,
        role: "agent",
        content:
          "Sorunuzu veya komutunuzu girin. Sistem, altyapı, otomasyon ve ajan mimarisi protokolleri üzerinden cevap üretecek.",
      },
    ],
  },
  en: {
    label: "Core AI chat interface",
    sidebarLabel: "Active agent protocols",
    status: "[ONLINE]",
    inputLabel: "Run a command or ask the agent",
    placeholder: "Run a command or ask the agent...",
    submit: "RUN",
    response:
      "[AI_LOG] Command received. Intent is being routed through the SYSTEM_CORE_AGENT_V1.0.md protocol layer.",
    messages: [
      {
        id: 1,
        role: "agent",
        content: "[AI_LOG] Root_Agent initialized. Agentic gateway ready.",
        tone: "neon",
      },
      {
        id: 2,
        role: "agent",
        content: "[AI_LOG] Memory layer awaiting Supabase core connection.",
        tone: "gold",
      },
      {
        id: 3,
        role: "agent",
        content: "[AI_LOG] Work lines: strategy, code, finance, audit.",
        tone: "neon",
      },
      {
        id: 4,
        role: "agent",
        content:
          "Enter a question or command. The system will respond through infrastructure, automation, and agent architecture protocols.",
      },
    ],
  },
} satisfies Record<Locale, {
  label: string;
  sidebarLabel: string;
  status: string;
  inputLabel: string;
  placeholder: string;
  submit: string;
  response: string;
  messages: ChatMessage[];
}>;

const protocolAgents = ["[Root_Agent]", "[Coder_Agent]", "[Finance_Agent]"];

export function CoreAiChat({ locale }: { locale: Locale }) {
  const copy = chatCopy[locale];
  const [messages, setMessages] = useState<ChatMessage[]>(copy.messages);
  const [command, setCommand] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedCommand = command.trim();
    if (!trimmedCommand) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        content: trimmedCommand,
      },
      {
        id: Date.now() + 1,
        role: "agent",
        content: copy.response,
        tone: "gold",
      },
    ]);
    setCommand("");
  }

  return (
    <div className="core-chat-shell" aria-label={copy.label}>
      <aside className="core-chat-sidebar" aria-label={copy.sidebarLabel}>
        <p className="core-chat-sidebar-title">ACTIVE_PROTOCOLS</p>
        <div className="core-chat-agent-list">
          {protocolAgents.map((agent) => (
            <span className="core-chat-agent" key={agent}>
              {agent}
            </span>
          ))}
        </div>
        <div className="core-chat-sidebar-metrics" aria-hidden="true">
          <p>
            <span>MEM</span>
            <strong className="tone-gold">SENKRON</strong>
          </p>
          <p>
            <span>EDGE</span>
            <strong className="tone-neon">HAZIR</strong>
          </p>
          <p>
            <span>QUEUE</span>
            <strong>003</strong>
          </p>
        </div>
      </aside>

      <section className="core-chat-main">
        <div className="core-chat-titlebar">
          <div className="core-chat-title">
            <span className="status-dot" aria-hidden="true" />
            <span>SYSTEM_CORE_AGENT_V1.0.md</span>
          </div>
          <span className="core-chat-title-status">{copy.status}</span>
        </div>

        <div className="core-chat-messages" ref={scrollRef}>
          {messages.map((message) => (
            <div
              className={
                message.role === "user"
                  ? "chat-message chat-message-user"
                  : "chat-message chat-message-agent"
              }
              key={message.id}
            >
              {message.role === "agent" ? (
                <span className="chat-message-prefix">[AI]</span>
              ) : null}
              <span
                className={
                  message.tone === "gold"
                    ? "chat-message-text tone-gold"
                    : message.tone === "neon"
                      ? "chat-message-text tone-neon"
                      : "chat-message-text"
                }
              >
                {message.content}
              </span>
            </div>
          ))}
        </div>

        <form className="core-chat-inputbar" onSubmit={handleSubmit}>
          <div className="core-chat-input-wrap">
            <span aria-hidden="true">core:~$</span>
            <input
              aria-label={copy.inputLabel}
              className="core-chat-input"
              onChange={(event) => setCommand(event.target.value)}
              placeholder={copy.placeholder}
              suppressHydrationWarning
              type="text"
              value={command}
            />
          </div>
          <button className="core-chat-submit" type="submit">
            {copy.submit}
          </button>
        </form>
      </section>
    </div>
  );
}
