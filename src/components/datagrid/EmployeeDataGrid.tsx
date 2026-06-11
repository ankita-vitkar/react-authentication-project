import { useEffect, useMemo, useState } from "react";
import { Box, Chip } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  type GridColDef,
  type GridPaginationModel,
  type GridRowModel,
  type GridSortModel,
} from "@mui/x-data-grid";
import type { Employee } from "../../types/employee";
import { fetchEmployees, updateEmployee } from "../../services/mockApi";
import { EmptyState } from "../ui/EmptyState";

export default function EmployeeDataGrid() {
  const [rows, setRows] = useState<Employee[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  useEffect(() => {
    let active = true;

    const loadRows = async () => {
      setLoading(true);
      const sortField = sortModel[0]?.field as keyof Employee | null;
      const sortOrder = sortModel[0]?.sort ?? null;

      const { rows: employees, total } = await fetchEmployees({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        sortField,
        sortOrder,
        search: "",
      });

      if (!active) {
        return;
      }

      setRows(employees);
      setRowCount(total);
      setLoading(false);
    };

    void loadRows();

    return () => {
      active = false;
    };
  }, [paginationModel, sortModel]);

  const columns = useMemo<GridColDef[]>(() => [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1, editable: true },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      editable: true,
      renderCell: (params) => <Chip label={params.value as string} color="primary" size="small" />,
    },
    {
      field: "qualification",
      headerName: "Qualification",
      flex: 1,
      editable: true,
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 1,
      editable: false,
      valueFormatter: ({ value }) => `$${Number(value ?? 0).toLocaleString()}`,
    },
  ], []);

  const handleProcessRowUpdate = async (newRow: GridRowModel) => {
    const nextRow = newRow as Employee;
    const updated = await updateEmployee(nextRow);
    setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)));
    return updated;
  };

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      {rows.length === 0 && !loading ? (
        <EmptyState title="No employees found" description="Add new staff members to populate this table." />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          loading={loading}
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          rowCount={rowCount}
          onPaginationModelChange={setPaginationModel}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={console.error}
          slots={{ toolbar: GridToolbar }}
          sx={{ border: 0 }}
        />
      )}
    </Box>
  );
}