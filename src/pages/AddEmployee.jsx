import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddEmployee({ addEmployee }) {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");

  const [errors, setErrors] = useState({});

  const departments = [
    "IT",
    "HR",
    "Finance",
    "Marketing",
    "Operations",
    "Sales",
  ];

  const validateForm = () => {

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Employee name is required.";
    }

    if (!department) {
      newErrors.department = "Please select a department.";
    }

    if (!designation.trim()) {
      newErrors.designation = "Designation is required.";
    }

    if (!salary) {
      newErrors.salary = "Salary is required.";
    } else if (Number(salary) <= 0) {
      newErrors.salary =
        "Salary must be greater than 0.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newEmployee = {
      id: Date.now(),
      name: name.trim(),
      department,
      designation: designation.trim(),
      salary: Number(salary),
    };

    addEmployee(newEmployee);

    navigate("/employees");
  };

  const handleReset = () => {
    setName("");
    setDepartment("");
    setDesignation("");
    setSalary("");
    setErrors({});
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-7">

          <div className="card border-0 shadow-lg rounded-4">

            <div className="card-header bg-primary text-white p-4 rounded-top-4">

              <h3 className="mb-1 fw-bold">
                Add Employee
              </h3>

              <p className="mb-0 opacity-75">
                Enter employee information below
              </p>

            </div>

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Employee Name
                  </label>

                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Enter employee name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name}
                    </div>
                  )}

                </div>

                {/* Department */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Department
                  </label>

                  <select
                    className={`form-select ${
                      errors.department
                        ? "is-invalid"
                        : ""
                    }`}
                    value={department}
                    onChange={(e) =>
                      setDepartment(e.target.value)
                    }
                  >

                    <option value="">
                      Select Department
                    </option>

                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}

                  </select>

                  {errors.department && (
                    <div className="invalid-feedback">
                      {errors.department}
                    </div>
                  )}

                </div>

                {/* Designation */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Designation
                  </label>

                  <input
                    type="text"
                    className={`form-control ${
                      errors.designation
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter designation"
                    value={designation}
                    onChange={(e) =>
                      setDesignation(e.target.value)
                    }
                  />

                  {errors.designation && (
                    <div className="invalid-feedback">
                      {errors.designation}
                    </div>
                  )}

                </div>

                {/* Salary */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Salary
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="1"
                      className={`form-control ${
                        errors.salary
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter salary"
                      value={salary}
                      onChange={(e) =>
                        setSalary(e.target.value)
                      }
                    />

                  </div>

                  {errors.salary && (
                    <div className="text-danger small mt-1">
                      {errors.salary}
                    </div>
                  )}

                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                  >
                    Save Employee
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={handleReset}
                  >
                    Reset
                  </button>

                  <Link
                    to="/employees"
                    className="btn btn-outline-danger px-4 ms-auto"
                  >
                    Cancel
                  </Link>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddEmployee;