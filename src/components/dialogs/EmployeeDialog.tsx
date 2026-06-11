import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { Employee } from "../../types/employee";
import { getSalaryForQualification, qualificationOptions } from "../../services/mockApi";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (employee: Omit<Employee, "id">) => void;
  employee?: Employee | null;
}

const emptyEmployee = {
  name: "",
  department: "",
  qualification: "Bachelor's",
  salary: 0,
};

export default function EmployeeDialog({
  open,
  onClose,
  onSave,
  employee,
}: Props) {
  const [formState, setFormState] = useState<Omit<Employee, "id">>(emptyEmployee);
  const [error, setError] = useState("");

  useEffect(() => {
    if (employee) {
      setFormState({
        name: employee.name,
        department: employee.department,
        qualification: employee.qualification || "Bachelor's",
        salary: employee.salary,
      });
    } else {
      setFormState(emptyEmployee);
    }
    setError("");
  }, [employee, open]);

  const title = useMemo(
    () => (employee ? "Edit employee" : "Add employee"),
    [employee]
  );

  const computedSalary = useMemo(
    () => getSalaryForQualification(formState.qualification || "Bachelor's"),
    [formState.qualification]
  );

  const handleChange = (
    field: keyof Omit<Employee, "id">,
    value: string | number
  ) => {
    setFormState((prev) => {
      if (field === "qualification") {
        return {
          ...prev,
          qualification: String(value),
          salary: getSalaryForQualification(String(value)),
        };
      }

      return {
        ...prev,
        [field]: field === "salary" ? Number(value) : String(value),
      };
    });
  };

  const handleSubmit = () => {
    if (!formState.name.trim() || !formState.department.trim()) {
      setError("Please provide a name and department.");
      return;
    }

    if (!formState.qualification) {
      setError("Please select a qualification.");
      return;
    }

    setError("");
    onSave({
      ...formState,
      qualification: formState.qualification,
      salary: getSalaryForQualification(formState.qualification),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={formState.name}
            onChange={(event) => handleChange("name", event.target.value)}
            fullWidth
          />
          <TextField
            label="Department"
            value={formState.department}
            onChange={(event) => handleChange("department", event.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="qualification-label">Qualification</InputLabel>
            <Select
              labelId="qualification-label"
              value={formState.qualification}
              label="Qualification"
              onChange={(event) => handleChange("qualification", event.target.value)}
            >
              {qualificationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: "primary.50",
              border: "1px solid",
              borderColor: "primary.100",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Salary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Based on qualification: {formState.qualification || "Bachelor's"}
            </Typography>
            <Typography variant="h6" sx={{ mt: 0.5, color: "primary.main" }}>
              ${computedSalary.toLocaleString()}
            </Typography>
          </Box>
          {error ? (
            <Box sx={{ color: "error.main", fontSize: 14 }}>{error}</Box>
          ) : null}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
