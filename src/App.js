import React, { useState, useEffect } from "react";
import FlipMove from "react-flip-move";
import Message from "./Message";
import "./App.scss";
import firebase from "firebase";
import db from "./firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessage] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessage(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (input !== "") {
      db.collection("messages").add({
        message: input,
        username: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setInput("");
  };

  return (
    <>
      <nav>
        <h1>Chatroom</h1>
      </nav>
      <div className="container">
        <span>Welcome {username || `Guest`} 🚀</span>
        <form className="app__form">
          <div className="form-container">
            <input
              placeholder="Enter a message"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit" onClick={sendMessage}>
              <i class="far fa-paper-plane"></i>
            </button>
          </div>
        </form>

        <FlipMove>
          {messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))}
        </FlipMove>
      </div>
    </>
  );
}

export default App;
