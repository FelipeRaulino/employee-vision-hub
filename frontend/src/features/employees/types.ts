export interface Employee {
  id: number;
  name: string;
  admissionDate: string;
  salary: number;
  status: "ACTIVE" | "INACTIVE";
}
export type GetEmployeesResponse = Employee[];
