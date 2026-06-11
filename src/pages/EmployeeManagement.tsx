import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import type {
  GridRenderCellParams,
  GridSortModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Employee } from "../types/employee";
import {
  addEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../services/mockApi";
import EmployeeDialog from "../components/dialogs/EmployeeDialog";

export default function EmployeeManagement() {
  const [rows, setRows] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    const sortField = sortModel[0]?.field as keyof Employee | null;
    const sortOrder = sortModel[0]?.sort ?? null;

    const result = await fetchEmployees({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
      sortField: sortField || null,
      sortOrder: sortOrder || null,
      search,
      department: departmentFilter === "All" ? undefined : departmentFilter,
    });

    setRows(result.rows);
    setTotal(result.total);
    setLoading(false);
  }, [departmentFilter, paginationModel, search, sortModel]);

  useEffect(() => {
    void loadEmployees();
  }, [loadEmployees]);

  const handleOpenDialog = () => {
    setEditingEmployee(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEmployee(null);
  };

  const handleSaveEmployee = async (employee: Omit<Employee, "id">) => {
    if (editingEmployee) {
      await updateEmployee({ ...editingEmployee, ...employee });
    } else {
      await addEmployee(employee);
    }
    handleCloseDialog();
    void loadEmployees();
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setDialogOpen(true);
  };

  const handleDelete = async (employee: Employee) => {
    await deleteEmployee(employee.id);
    void loadEmployees();
  };

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      { field: "name", headerName: "Name", flex: 1, minWidth: 140 },
      { field: "department", headerName: "Department", flex: 1, minWidth: 140 },
      { field: "qualification", headerName: "Qualification", flex: 1, minWidth: 140 },
      {
        field: "salary",
        headerName: "Salary",
        flex: 1,
        minWidth: 120,
        valueFormatter: ({ value }: { value: number | string }) =>
          `$${Number(value).toLocaleString()}`,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        filterable: false,
        width: 140,
        renderCell: (params: GridRenderCellParams<Employee>) => {
          const row = params.row as Employee;
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton aria-label="edit" size="small" onClick={() => handleEdit(row)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="small"
                color="error"
                onClick={() => void handleDelete(row)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    []
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Employee Management
          </Typography>
          <Typography color="text.secondary">
            Add, edit, delete, and search employees directly from the dashboard.
          </Typography>
        </Box>

        <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpenDialog}>
          Add employee
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          label="Search employees"
          value={search}
          onChange={(event) => {
            setPaginationModel((previous) => ({
              ...previous,
              page: 0,
            }));
            setSearch(event.target.value);
          }}
          placeholder="Search by name or department"
          fullWidth
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="department-filter-label">Department</InputLabel>
          <Select
            labelId="department-filter-label"
            value={departmentFilter}
            label="Department"
            onChange={(event) => {
              setDepartmentFilter(event.target.value);
              setPaginationModel((previous) => ({ ...previous, page: 0 }));
            }}
          >
            <MenuItem value="All">All departments</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          rowCount={total}
          onPaginationModelChange={(model) => {
            setPaginationModel(model);
          }}
          pageSizeOptions={[5, 10, 20]}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: false,
            },
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : null}

      <EmployeeDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveEmployee}
        employee={editingEmployee ?? undefined}
      />
    </Paper>
  );
}
