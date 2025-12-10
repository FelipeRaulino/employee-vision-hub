import { apiClient } from "@/lib/axiosClient";
import type { GetEmployeesResponse } from "./types";

export async function getEmployees() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbXBsb3llZS12aXNpb24taHViLWFwaSIsImlhdCI6MTc2NTM3Mzc3OCwiZXhwIjoxNzY1Mzk1Mzc4LCJzdWIiOiJzYWFtX2FkbWluQGV4YW1wbGUuY29tIn0.o8YunLAgHnbJEMqrWQ07fP8IHhIPpFsZkgABfZOk6CU";

  const res = await apiClient.get<GetEmployeesResponse>("/employees", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
