import React, { forwardRef } from "react";
import "./App.scss";

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <div className={isUser ? "message__userCard" : "message__guestCard"}>
        <div className="message__name">
          {!isUser && `${message.username || "Guest"}`}
        </div>
        {message.message}
      </div>
    </div>
  );
});

export default Message;
