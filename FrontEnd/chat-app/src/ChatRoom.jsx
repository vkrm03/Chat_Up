import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import "./assets/ChatRoom.css";

function ChatRoom() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const roomId = searchParams.get("id");
  const username = searchParams.get("username");
  const initialRoomName = searchParams.get("name");

  useEffect(() => {
    if (!username) {
      toast.error("Username missing! Redirecting...");
      navigate("/chat");
      return;
    }

    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
      reconnection: false,
    });
    setSocket(newSocket);

    newSocket.emit("joinRoom", { roomId, username, roomName: initialRoomName });

    newSocket.on("joinError", ({ error }) => {
      toast.error(error);
      newSocket.disconnect();
      navigate("/chat");
    });

    newSocket.on("roomDetails", ({ roomName, messages }) => {
      setRoomName(roomName);
      setMessages(messages);
    });

    newSocket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      newSocket.emit("leaveRoom", { roomId });
      newSocket.disconnect();
    };
  }, [roomId, username, navigate, initialRoomName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !socket) return;
    socket.emit("sendMessage", { roomId, username, text: inputMessage });
    setInputMessage("");
  };

  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit("leaveRoom", { roomId });
      socket.disconnect();
    }
    toast.info("You left the room");
    navigate("/chat");
  };

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <h2>{roomName || `Room-${roomId}`}</h2>
        <span className="room-id">Room ID: {roomId}</span>
        <span className="user-name">You: {username}</span>
        <button className="leave-btn" onClick={handleLeaveRoom}>
          Leave
        </button>
      </div>

      <div className="chatroom-messages">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === username ? "sent" : "received"}`}
            >
              <div className="message-content">
                <span className="sender">{msg.sender}</span>
                <p>{msg.text}</p>
                <span className="timestamp">{msg.time}</span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chatroom-input-area" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chatroom-input"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit" className="chatroom-send-btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
