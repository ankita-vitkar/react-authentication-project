import { useEffect, useState } from "react";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { socket } from "../../services/socket";

export default function NotificationPanel() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("notification", (data: string) => {
      setMessages((prev) => [data, ...prev].slice(0, 8));
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const emitTest = () => {
    socket.emit("notification", `Manual update at ${new Date().toLocaleTimeString()}`);
  };

  return (
    <Stack spacing={2}>
      <Button variant="outlined" onClick={emitTest} size="small">Send live update</Button>
      {messages.length === 0 ? (
        <Alert severity="info">Waiting for live notifications…</Alert>
      ) : (
        messages.map((msg, index) => (
          <Alert key={`${msg}-${index}`} severity="success">{msg}</Alert>
        ))
      )}
      <Box sx={{ mt: 1 }}>
        <Typography variant="caption" color="text.secondary">Realtime updates are streamed from the mock Socket.IO server.</Typography>
      </Box>
    </Stack>
  );
}