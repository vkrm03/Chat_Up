import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const PORT = 5000;

app.use(cors());
app.use(express.json());

const rooms = {};

app.get("/", (req, res) => {
  res.send("ChatUp Realtime Server is running 🚀");
});

app.get("/check-room/:roomId", (req, res) => {
  const { roomId } = req.params;
  if (rooms[roomId]) {
    return res.json({ exists: true });
  }
  return res.json({ exists: false });
});

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("joinRoom", ({ roomId, username }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = { messages: [], users: [] };
    }

    socket.join(roomId);
    rooms[roomId].users.push(username);

    console.log(`${username} joined room ${roomId}`);

    socket.emit("previousMessages", rooms[roomId].messages);

    socket.to(roomId).emit("receiveMessage", {
      sender: "System",
      text: `${username} has joined the room`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  });

  socket.on("sendMessage", ({ roomId, username, text }) => {
    const message = {
      id: Date.now(),
      sender: username,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    rooms[roomId].messages.push(message);
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("leaveRoom", ({ roomId, username }) => {
    socket.leave(roomId);
    if (rooms[roomId]) {
      rooms[roomId].users = rooms[roomId].users.filter((user) => user !== username);
      if (rooms[roomId].users.length === 0) {
        delete rooms[roomId];
      }
    }
    socket.to(roomId).emit("receiveMessage", {
      sender: "System",
      text: `${username} has left the room`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    console.log(`${username} left room ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
