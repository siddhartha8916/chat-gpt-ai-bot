import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { useCookies } from "react-cookie";
import { ChatLine, LoadingChatLine } from "./ChatLine";
import { ChatGPTMessage } from "../helpers/OpenAIStream";
import ChatSidebar from "./ChatSidebar";

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

  // send message to API /api/chat endpoint
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
    <Layout className="d-md-flex d-sm-block">
      <div className="col-md-3">
        <ChatSidebar />
      </div>
      <div className="col-md-7 offset-md-2">
        <div className="card shadow bg-body-tertiary rounded">
          <h4 className="card-header">Chat With AcademyAI</h4>
          <div
            className="card-body"
            style={{
              minHeight: "48.7vh",
              maxHeight: "48.7vh",
              overflow: "auto",
            }}
          >
            {messages.map(({ content, role }, index) => (
              <ChatLine key={index} role={role} content={content} />
            ))}
            {loading && <LoadingChatLine />}
            {messages.length < 2 && (
              <span className="fw-bold">
                Type a message to start the conversation
              </span>
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
      </div>
    </Layout>
  );
};

export default ChatSection;
