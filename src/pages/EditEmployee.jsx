import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

function EditEmployee({
  employees,
  updateEmployee,
}) {

  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employees.find(
    (emp) => String(emp.id) === String(id)
  );

  const [name, setName] = useState(
    employee?.name || ""
  );

  const [department, setDepartment] = useState(
    employee?.department || ""
  );

  const [designation, setDesignation] =
    useState(employee?.designation || "");

  const [salary, setSalary] = useState(
    employee?.salary || ""
  );

  const [error, setError] = useState("");

  const departments = [
    "IT",
    "HR",
    "Finance",
    "Marketing",
    "Operations",
    "Sales",
  ];

  if (!employee) {

    return (
      <div className="container py-5 text-center">

        <h3>
          Employee Not Found
        </h3>

        <Link
          to="/employees"
          className="btn btn-primary mt-3"
        >
          Back to Employees
        </Link>

      </div>
    );
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !name.trim() ||
      !department ||
      !designation.trim() ||
      !salary
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (Number(salary) <= 0) {
      setError(
        "Salary must be greater than 0."
      );
      return;
    }

    updateEmployee({
      id: employee.id,
      name: name.trim(),
      department,
      designation: designation.trim(),
      salary: Number(salary),
    });

    navigate("/employees");
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-7">

          <div className="card border-0 shadow-lg rounded-4">

            <div className="card-header bg-primary text-white p-4">

              <h3 className="fw-bold mb-1">
                Edit Employee
              </h3>

              <p className="mb-0 opacity-75">
                Update employee information
              </p>

            </div>

            <div className="card-body p-4">

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Employee Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Department
                  </label>

                  <select
                    className="form-select"
                    value={department}
                    onChange={(e) =>
                      setDepartment(e.target.value)
                    }
                  >

                    <option value="">
                      Select Department
                    </option>

                    {departments.map((dept) => (

                      <option
                        key={dept}
                        value={dept}
                      >
                        {dept}
                      </option>

                    ))}

                  </select>

                </div>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Designation
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={designation}
                    onChange={(e) =>
                      setDesignation(e.target.value)
                    }
                  />

                </div>

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
                      className="form-control"
                      value={salary}
                      onChange={(e) =>
                        setSalary(e.target.value)
                      }
                    />

                  </div>

                </div>

                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Update Employee
                  </button>

                  <Link
                    to="/employees"
                    className="btn btn-outline-secondary"
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

export default EditEmployee;