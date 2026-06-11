import { useState } from "react";
import { Box } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";

export default function TimePickerField() {
  const [value, setValue] = useState<Dayjs | null>(dayjs("09:30", "HH:mm"));

  return (
    <Box sx={{ width: "100%", maxWidth: 320 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Select time"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          ampm={false}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </LocalizationProvider>
    </Box>
  );
}