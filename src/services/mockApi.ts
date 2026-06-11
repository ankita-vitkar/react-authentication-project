import type { Employee } from "../types/employee";

const qualificationSalaryMap = {
  "High School": 30000,
  Diploma: 40000,
  "Bachelor's": 50000,
  "Master's": 65000,
  PhD: 80000,
} as const;

export const getSalaryForQualification = (qualification: string) =>
  qualificationSalaryMap[qualification as keyof typeof qualificationSalaryMap] ?? 0;

const normalizeEmployee = (employee: Employee): Employee => ({
  ...employee,
  qualification: employee.qualification || "Bachelor's",
  salary: getSalaryForQualification(employee.qualification) || employee.salary,
});

export const qualificationOptions = Object.keys(qualificationSalaryMap);

const initialEmployees: Employee[] = [
  { id: 1, name: "John", department: "IT", qualification: "Bachelor's", salary: 50000 },
  { id: 2, name: "Alice", department: "HR", qualification: "Diploma", salary: 40000 },
  { id: 3, name: "Bob", department: "Finance", qualification: "Master's", salary: 60000 },
  { id: 4, name: "Maya", department: "IT", qualification: "Bachelor's", salary: 52000 },
  { id: 5, name: "Sam", department: "HR", qualification: "Diploma", salary: 42000 },
  { id: 6, name: "Nina", department: "Finance", qualification: "Master's", salary: 58000 },
  { id: 7, name: "Liam", department: "IT", qualification: "PhD", salary: 65000 },
  { id: 8, name: "Olivia", department: "HR", qualification: "Bachelor's", salary: 47000 },
  { id: 9, name: "Ethan", department: "Finance", qualification: "Master's", salary: 61000 },
  { id: 10, name: "Sophia", department: "IT", qualification: "Bachelor's", salary: 53000 },
  { id: 11, name: "Mia", department: "HR", qualification: "High School", salary: 39000 },
  { id: 12, name: "Noah", department: "Finance", qualification: "PhD", salary: 69000 },
  { id: 13, name: "Ava", department: "IT", qualification: "Bachelor's", salary: 51000 },
  { id: 14, name: "Lucas", department: "HR", qualification: "Diploma", salary: 44000 },
  { id: 15, name: "Zoe", department: "Finance", qualification: "Master's", salary: 62000 },
  { id: 16, name: "Eli", department: "IT", qualification: "Bachelor's", salary: 55000 },
  { id: 17, name: "Chloe", department: "HR", qualification: "Diploma", salary: 43000 },
  { id: 18, name: "Mason", department: "Finance", qualification: "PhD", salary: 64000 },
  { id: 19, name: "Ella", department: "IT", qualification: "Bachelor's", salary: 56000 },
  { id: 20, name: "Owen", department: "HR", qualification: "High School", salary: 45000 },
];

export let employees: Employee[] = initialEmployees.map(normalizeEmployee);

export interface FetchEmployeesOptions {
  page: number;
  pageSize: number;
  sortField: keyof Employee | null;
  sortOrder: "asc" | "desc" | null;
  search: string;
  department?: string;
}

const sortEmployees = (
  rows: Employee[],
  field: keyof Employee | null,
  order: "asc" | "desc" | null
) => {
  if (!field || !order) {
    return rows;
  }

  return [...rows].sort((a, b) => {
    const first = a[field];
    const second = b[field];

    if (typeof first === "string" && typeof second === "string") {
      return order === "asc"
        ? first.localeCompare(second)
        : second.localeCompare(first);
    }

    if (typeof first === "number" && typeof second === "number") {
      return order === "asc" ? first - second : second - first;
    }

    return 0;
  });
};

export async function fetchEmployees({
  page,
  pageSize,
  sortField,
  sortOrder,
  search,
  department,
}: FetchEmployeesOptions): Promise<{ rows: Employee[]; total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalizedSearch = search.trim().toLowerCase();

      let filtered = employees.filter((employee) => {
        const nameMatch = employee.name.toLowerCase().includes(normalizedSearch);
        const departmentMatch = employee.department
          .toLowerCase()
          .includes(normalizedSearch);
        const qualificationMatch = employee.qualification
          .toLowerCase()
          .includes(normalizedSearch);
        const matchesSearch = normalizedSearch
          ? nameMatch || departmentMatch || qualificationMatch
          : true;
        const matchesDepartment = department ? employee.department === department : true;

        return matchesSearch && matchesDepartment;
      });

      filtered = sortEmployees(filtered, sortField, sortOrder);

      const total = filtered.length;
      const start = page * pageSize;
      const rows = filtered.slice(start, start + pageSize);

      resolve({ rows, total });
    }, 300);
  });
}

export async function addEmployee(
  employee: Omit<Employee, "id">
): Promise<Employee> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nextId = employees.length > 0 ? Math.max(...employees.map((item) => item.id)) + 1 : 1;
      const newEmployee = normalizeEmployee({ id: nextId, ...employee });
      employees = [...employees, newEmployee];
      resolve(newEmployee);
    }, 200);
  });
}

export async function updateEmployee(employee: Employee): Promise<Employee> {
  return new Promise((resolve) => {
    setTimeout(() => {
      employees = employees.map((item) =>
        item.id === employee.id
          ? normalizeEmployee({ ...item, ...employee })
          : item
      );
      resolve(employee);
    }, 200);
  });
}

export async function deleteEmployee(id: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      employees = employees.filter((item) => item.id !== id);
      resolve();
    }, 200);
  });
}
