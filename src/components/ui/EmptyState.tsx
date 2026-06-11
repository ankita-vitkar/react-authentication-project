import { Alert, Button, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: Props) {
  return (
    <Stack spacing={2} sx={{ alignItems: "flex-start", p: 2 }}>
      <Alert severity="info" sx={{ width: "100%" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Alert>
      {actionLabel && onAction ? <Button variant="contained" onClick={onAction}>{actionLabel}</Button> : null}
    </Stack>
  );
}
