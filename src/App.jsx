import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  const [employees, setEmployees] = useState(() => {
    try {
      const savedEmployees = localStorage.getItem("employees");
      return savedEmployees ? JSON.parse(savedEmployees) : [];
    } catch (error) {
      console.error("Error loading employees:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      employee,
    ]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === updatedEmployee.id
          ? updatedEmployee
          : employee
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };

  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Dashboard employees={employees} />}
          />

          <Route
            path="/employees"
            element={
              <EmployeeList
                employees={employees}
                deleteEmployee={deleteEmployee}
              />
            }
          />

          <Route
            path="/add-employee"
            element={
              <AddEmployee
                addEmployee={addEmployee}
              />
            }
          />

          <Route
            path="/edit-employee/:id"
            element={
              <EditEmployee
                employees={employees}
                updateEmployee={updateEmployee}
              />
            }
          />

          <Route
            path="/employee/:id"
            element={
              <EmployeeDetails
                employees={employees}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;