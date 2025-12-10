import { useEmployeeData } from "./hooks/useEmployeeData";
import { DataTable, type DataTableValueArray } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { PlusIcon, XIcon } from "lucide-react";
import React from "react";
import type { Employee } from "./types";
import CreateUserForm from "./components/CreateUserForm";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { apiClient } from "@/lib/axiosClient";

const Home = () => {
  const { data, setData } = useEmployeeData();
  const emptyEmployee: Employee = {
    id: -1,
    name: "",
    admissionDate: "",
    salary: 0,
    status: "INACTIVE",
  };

  const [employeeDialog, setEmployeeDialog] = React.useState<boolean>(false);
  const [employee, setEmployee] = React.useState<Employee>(emptyEmployee);
  const [selectedEmployees, setSelectedEmployees] = React.useState<Employee[]>(
    []
  );
  const [deleteEmployeeDialog, setDeleteEmployeeDialog] =
    React.useState<boolean>(false);
  const [deleteEmployeesDialog, setDeleteEmployeesDialog] =
    React.useState<boolean>(false);
  const toast = React.useRef<Toast>(null);

  const openNew = () => {
    setEmployee(emptyEmployee);
    setEmployeeDialog(true);
  };

  const hideDialog = () => {
    setEmployeeDialog(false);
  };

  const hideDeleteEmployeeDialog = () => {
    setDeleteEmployeeDialog(false);
  };

  const hideDeleteEmployeesDialog = () => {
    setDeleteEmployeesDialog(false);
  };

  const confirmDeleteEmployee = (employee: Employee) => {
    setEmployee(employee);
    setDeleteEmployeeDialog(true);
  };

  const confirmDeleteSelected = () => {
    setDeleteEmployeesDialog(true);
  };

  const deleteSelectedEmployees = () => {
    const _employees = data.filter((val) => !selectedEmployees.includes(val));

    try {
      selectedEmployees.forEach(async (item) => {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbXBsb3llZS12aXNpb24taHViLWFwaSIsImlhdCI6MTc2NTM3Mzc3OCwiZXhwIjoxNzY1Mzk1Mzc4LCJzdWIiOiJzYWFtX2FkbWluQGV4YW1wbGUuY29tIn0.o8YunLAgHnbJEMqrWQ07fP8IHhIPpFsZkgABfZOk6CU";

        const res = await apiClient.delete<Employee>(`/employees/${item.id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        console.log(res);
      });

      setData(_employees);
      setDeleteEmployeesDialog(false);
      setSelectedEmployees([]);
      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: "Employee Deleted",
        life: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployeesDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteEmployeesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedEmployees}
      />
    </React.Fragment>
  );

  const findIndexById = (id: number) => {
    let index = -1;

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => data.length;

  const editEmployee = (employee: Employee) => {
    setEmployee({ ...employee });
    setEmployeeDialog(true);
  };

  const actionBodyTemplate = (rowData: Employee) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editEmployee(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteEmployee(rowData)}
        />
      </React.Fragment>
    );
  };

  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteEmployeesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedEmployees}
      />
    </React.Fragment>
  );

  return (
    <section className="w-full flex flex-col py-6">
      <Toast ref={toast} />
      <h1 className="text-2xl font-semibold">Employees</h1>
      <div className="flex flex-col mt-8 min-w-[1200px] max-w-[90%] self-center">
        <div className="flex gap-3 mb-3">
          <button
            className="px-3 py-2 flex items-center gap-2 cursor-pointer bg-green-400 rounded-sm text-white text-sm 
            transition-color delay-75 ease-in hover:bg-green-500"
            onClick={openNew}
          >
            New
            <PlusIcon size={18} color="#fff" />
          </button>
          <button
            className="px-3 py-2 flex items-center gap-2 cursor-pointer bg-red-400 rounded-sm text-white 
            text-sm transition-color delay-75 ease-in hover:bg-red-500"
            onClick={confirmDeleteSelected}
            disabled={!selectedEmployees || !selectedEmployees.length}
          >
            Remove
            <XIcon size={18} color="#fff" />
          </button>
        </div>
        <DataTable
          value={data as DataTableValueArray}
          className="min-w-full"
          selection={selectedEmployees}
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedEmployees(e.value);
            }
          }}
          selectionMode="multiple"
        >
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="admissionDate" header="Admission Date"></Column>
          <Column field="salary" header="Salary"></Column>
          <Column field="status" header="Status"></Column>
          <Column
            headerStyle={{ width: "5rem", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
            body={actionBodyTemplate}
          />
        </DataTable>
      </div>
      <Dialog
        visible={employeeDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="New Employee"
        modal
        draggable={false}
        onHide={hideDialog}
      >
        <CreateUserForm
          data={data}
          setData={setData}
          employee={employee}
          setEmployee={setEmployee}
          emptyEmployee={emptyEmployee}
          setEmployeeDialog={setEmployeeDialog}
          toast={toast}
          findIndexById={findIndexById}
          createId={createId}
        />
      </Dialog>

      <Dialog
        visible={deleteEmployeeDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteEmployeesDialogFooter}
        onHide={hideDeleteEmployeeDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {employee && (
            <span>
              Are you sure you want to delete <b>{employee.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteEmployeesDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteEmployeesDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {employee && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </section>
  );
};

export default Home;
