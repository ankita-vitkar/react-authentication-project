import { useState } from "react";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";

export default function DatePickerField() {
  const [value, setValue] = useState<Dayjs | null>(dayjs("2026-06-11"));

  return (
    <Box sx={{ width: "100%", maxWidth: 320 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </LocalizationProvider>
    </Box>
  );
}