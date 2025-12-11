import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiClient } from "@/lib/axiosClient";
import type { AxiosError } from "axios";
import type { Toast } from "primereact/toast";
import type { Employee } from "../types";

type STATUS = "ACTIVE" | "INACTIVE";

type CreateEmployeeFormValues = {
  name: string;
  admissionDate: string;
  salary: number;
  status: STATUS;
};

type Props = {
  // lista atual de employees e setter
  data: Employee[];
  setData: (v: Employee[]) => void;

  // employee que está sendo editado (ou empty para criar)
  employee: Employee;
  setEmployee: (e: Employee) => void;
  emptyEmployee: Employee;

  // UI helpers
  setEmployeeDialog: (open: boolean) => void;
  toast: React.RefObject<Toast | null>;

  // utilitários (você já tem no contexto do componente original)
  createId: () => number;
  findIndexById: (id: number) => number;
};

export default function EmployeeForm({
  data,
  setData,
  employee,
  setEmployee,
  emptyEmployee,
  setEmployeeDialog,
  toast,
  createId,
  findIndexById,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEmployeeFormValues>({
    defaultValues: {
      name: "",
      admissionDate: "",
      salary: 0,
      status: "INACTIVE",
    },
  });

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name ?? "",
        admissionDate: employee.admissionDate ?? "",
        salary: employee.salary ?? 0,
        status: employee.status ?? "INACTIVE",
      });
    }
  }, [employee, reset]);

  async function onSubmit(values: CreateEmployeeFormValues) {
    const dto = {
      name: values.name,
      admissionDate: values.admissionDate,
      salary: values.salary,
      status: values.status,
    };

    const token = localStorage.getItem("token");

    try {
      if (employee?.id && employee.id !== -1) {
        const res = await apiClient.put<Employee>(
          `/employees/${employee.id}`,
          dto,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );

        const updated = res.data;
        // Atualiza array local
        const _employees = [...data];
        const idx = findIndexById(employee.id!);
        if (idx !== -1) {
          _employees[idx] = updated;
        } else {
          // fallback: push se não encontrar
          _employees.push(updated);
        }

        setData(_employees);
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Employee Updated",
          life: 3000,
        });
      } else {
        const res = await apiClient.post<Employee>("/employees", dto, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        const created = res.data;
        const _employees = [...data];

        if (created && created.id) {
          _employees.push(created);
        } else {
          const generated: Employee = {
            ...dto,
            id: createId(),
          };
          _employees.push(generated);
        }

        setData(_employees);
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Employee Created",
          life: 3000,
        });
      }

      setEmployeeDialog(false);
      setEmployee(emptyEmployee);
      reset();
    } catch (err) {
      const ae = err as AxiosError;
      if (ae?.response) {
        const status = ae.response.status;
        const dataErr = ae.response.data;
        console.error("Erro do servidor:", status, dataErr);
        setEmployeeDialog(false);
        setEmployee(emptyEmployee);
        toast.current?.show({
          severity: "error",
          summary: `Error ${status}`,
          detail: JSON.stringify(dataErr),
          life: 5000,
        });
      } else {
        console.error("Erro desconhecido", err);
        setEmployeeDialog(false);
        setEmployee(emptyEmployee);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Unknown error while saving employee",
          life: 5000,
        });
      }
      // não fechar modal para permitir correção
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto rounded my-4 p-4"
    >
      {/* Name */}
      <label className="block mb-2 text-sm font-medium">Name</label>
      <input
        type="text"
        {...register("name", { required: "Name is required" })}
        className={`w-full px-3 py-2 border rounded mb-1 ${
          errors.name ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Type here the name"
      />
      {errors.name && (
        <p className="text-red-600 text-sm mb-2">{errors.name.message}</p>
      )}

      {/* Admission Date */}
      <label className="block mb-2 text-sm font-medium">Admission Date</label>
      <input
        type="date"
        {...register("admissionDate", {
          required: "Admission Date is required",
        })}
        className={`w-full px-3 py-2 border rounded mb-1 ${
          errors.admissionDate ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.admissionDate && (
        <p className="text-red-600 text-sm mb-2">
          {errors.admissionDate.message}
        </p>
      )}

      {/* Salary */}
      <label className="block mb-2 text-sm font-medium">Salary</label>
      <input
        type="number"
        step="0.01"
        {...register("salary", {
          required: "Salary is required",
          valueAsNumber: true,
        })}
        className={`w-full px-3 py-2 border rounded mb-1 ${
          errors.salary ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="0.00"
      />
      {errors.salary && (
        <p className="text-red-600 text-sm mb-2">{errors.salary.message}</p>
      )}

      {/* Status */}
      <label className="block mb-2 text-sm font-medium">Status</label>
      <select
        {...register("status", { required: true })}
        className="w-full px-3 py-2 border rounded mb-4 border-gray-300"
      >
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting
            ? "Salvando..."
            : employee?.id && employee.id !== -1
            ? "Atualizar"
            : "Criar"}
        </button>

        <button
          type="button"
          onClick={() => {
            reset();
            setEmployee(emptyEmployee);
            setEmployeeDialog(false);
          }}
          className="px-4 py-2 rounded border text-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
