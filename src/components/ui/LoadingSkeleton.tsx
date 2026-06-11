import { Skeleton, Stack } from "@mui/material";

export function LoadingSkeleton() {
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={120} />
      <Skeleton variant="rectangular" height={120} />
    </Stack>
  );
}
