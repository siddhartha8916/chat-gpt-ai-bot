import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { useCookies } from "react-cookie";
import { ChatLine, LoadingChatLine } from "./ChatLine";

type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

const COOKIE_NAME = "academy-ai-chat-gpt3";

export const initialMessages: ChatGPTMessage[] = [
  {
    role: "assistant",
    content: "Hi! I am a friendly AI assistant. Ask me anything!",
  },
];

const ChatSection = () => {
  const [promptText, setPromptText] = useState("");
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(promptText);
  };

  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { role: "user", content: message } as ChatGPTMessage,
    ];
    setMessages(newMessages);
    const last10messages = newMessages.slice(-10); // remember last 10 messages

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: last10messages,
        user: cookie[COOKIE_NAME],
      }),
    });

    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;

      setMessages([
        ...newMessages,
        { role: "assistant", content: lastMessage } as ChatGPTMessage,
      ]);

      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Chat With AcademyAI</h4>
        <div className="card-body">
          {messages.map(({ content, role }, index) => (
            <ChatLine key={index} role={role} content={content} />
          ))}
          {loading && <LoadingChatLine />}
          {messages.length < 2 && (
            <span>Type a message to start the conversation</span>
          )}
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Enter Text</label>
            <input
              name="promptText"
              type="text"
              className="form-control"
              value={promptText}
              onChange={(e) => {
                setPromptText(e?.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(promptText);
                  setPromptText("");
                }
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              sendMessage(promptText);
              setPromptText("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ChatSection;
