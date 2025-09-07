import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

const PORT = 5000;
app.use(cors());
app.use(express.json());

const rooms = {};

app.get("/", (req, res) => {
  res.send("ChatUp Realtime Server is running 🚀");
});

app.get("/check-room/:roomId", (req, res) => {
  const room = rooms[req.params.roomId];
  res.json({ exists: !!room, requiresPassword: room?.password ? true : false });
});

app.post("/verify-password/:roomId", (req, res) => {
  const room = rooms[req.params.roomId];
  if (!room) return res.json({ success: false, message: "Room not found" });
  if (room.password && room.password !== req.body.password) {
    return res.json({ success: false, message: "Incorrect password" });
  }
  return res.json({ success: true });
});

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ roomId, username, roomName, password }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        name: roomName || `Room-${roomId}`,
        password: password || "",
        messages: [],
        users: {},
      };
    }

    const room = rooms[roomId];

    if (room.password && room.password !== password) {
      return socket.emit("joinError", { error: "Incorrect room password" });
    }

    const existingUser = Object.values(room.users).find(
      (u) => u.username === username
    );
    if (existingUser) {
      return socket.emit("joinError", {
        error: `Username "${username}" already active.`,
      });
    }

    room.users[socket.id] = { username };
    socket.join(roomId);

    socket.emit("roomDetails", { roomName: room.name, messages: room.messages });

    socket.to(roomId).emit("receiveMessage", {
      sender: "System",
      text: `${username} has joined the room`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  });

  socket.on("sendMessage", ({ roomId, username, text }) => {
    const room = rooms[roomId];
    if (!room || !room.users[socket.id]) return;

    const message = {
      id: Date.now(),
      sender: username,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    room.messages.push(message);
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("leaveRoom", ({ roomId }, callback) => {
    const room = rooms[roomId];
    if (!room || !room.users[socket.id]) {
      if (callback) callback();
      return;
    }

    const username = room.users[socket.id].username;
    delete room.users[socket.id];
    socket.leave(roomId);

    if (Object.keys(room.users).length === 0) {
      delete rooms[roomId];
    } else {
      socket.to(roomId).emit("receiveMessage", {
        sender: "System",
        text: `${username} has left the room`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    }

    if (callback) callback();
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      if (rooms[roomId].users[socket.id]) {
        const username = rooms[roomId].users[socket.id].username;
        delete rooms[roomId].users[socket.id];

        if (Object.keys(rooms[roomId].users).length === 0) {
          delete rooms[roomId];
        } else {
          socket.to(roomId).emit("receiveMessage", {
            sender: "System",
            text: `${username} has disconnected`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          });
        }
      }
    }
  });
});

server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
