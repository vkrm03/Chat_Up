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
  res.json({ exists: !!rooms[roomId] });
});

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("joinRoom", ({ roomId, username }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = { messages: [], users: {} };
    }

    if (rooms[roomId].users[socket.id]) return;

    rooms[roomId].users[socket.id] = username;
    socket.join(roomId);

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

  socket.on("leaveRoom", ({ roomId }) => {
    const username = rooms[roomId]?.users[socket.id];
    if (!username) return;

    socket.leave(roomId);
    delete rooms[roomId].users[socket.id];

    if (Object.keys(rooms[roomId].users).length === 0) {
      delete rooms[roomId];
    }

    socket.to(roomId).emit("receiveMessage", {
      sender: "System",
      text: `${username} has left the room`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    console.log(`${username} left room ${roomId}`);
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      if (rooms[roomId].users[socket.id]) {
        const username = rooms[roomId].users[socket.id];
        delete rooms[roomId].users[socket.id];

        socket.to(roomId).emit("receiveMessage", {
          sender: "System",
          text: `${username} has disconnected`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });

        if (Object.keys(rooms[roomId].users).length === 0) {
          delete rooms[roomId];
        }

        console.log(`${username} disconnected from room ${roomId}`);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
