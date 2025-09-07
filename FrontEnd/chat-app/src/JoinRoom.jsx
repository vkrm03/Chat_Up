import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./assets/Room.css";

function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!roomCode.trim() || !username.trim()) return toast.error("Please enter both room code and username!");

    try {
      const response = await fetch(`http://localhost:5000/check-room/${roomCode}`);
      const data = await response.json();
      if (!data.exists) return toast.error("Room does not exist!");

      let password = "";
      if (data.requiresPassword) {
        password = prompt("Enter room password:");
        if (password === null) return;
      }

      const verifyRes = await fetch(`http://localhost:5000/verify-password/${roomCode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) return toast.error(verifyData.message);

      toast.success("Joined room successfully!");
      navigate(`/chat/chat-room?id=${roomCode}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="roomform-container">
      <div className="roomform-card">
        <h2>Join a Room</h2>
        <p className="roomform-subtitle">Enter the room code and your username to join the chat.</p>
        <form onSubmit={handleJoin}>
          <input type="text" className="roomform-input" placeholder="Enter Room Code" value={roomCode} onChange={e => setRoomCode(e.target.value)} required />
          <input type="text" className="roomform-input" placeholder="Enter Your Username" value={username} onChange={e => setUsername(e.target.value)} required />
          <button type="submit" className="roomform-btn">Join Now</button>
        </form>
      </div>
    </div>
  );
}

export default JoinRoom;
