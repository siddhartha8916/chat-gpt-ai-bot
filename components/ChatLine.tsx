import React from "react";
import { type ChatGPTMessage } from "../helpers/OpenAIStream";

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="spinner-grow text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ role = "assistant", content }: ChatGPTMessage) {
  if (!content) {
    return null;
  }
  const formatteMessage = convertNewLines(content);

  return (
    <div>
      <a href="#" className="hover:underline">
        {role == "assistant" ? "AI" : "You"}
      </a>
      <p>{formatteMessage}</p>
    </div>
  );
}
