import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

console.log("Socket Server Running on Port 3001");

setInterval(() => {
  io.emit(
    "notification",
    `New notification at ${new Date().toLocaleTimeString()}`
  );
}, 5000);