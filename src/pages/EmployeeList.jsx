import { useState } from "react";
import { Link } from "react-router-dom";

function EmployeeList({ employees, deleteEmployee }) {

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [deleteId, setDeleteId] = useState(null);

  const departments = [
    ...new Set(
      employees
        .map((employee) => employee.department)
        .filter(Boolean)
    ),
  ];

  const filteredEmployees = employees.filter(
    (employee) => {

      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.designation
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      return (
        matchesSearch &&
        matchesDepartment
      );
    }
  );

  const formatSalary = (salary) => {
    return Number(salary).toLocaleString("en-IN");
  };

  const confirmDelete = () => {

    if (deleteId !== null) {
      deleteEmployee(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Employees
          </h2>

          <p className="text-muted mb-0">
            Manage your employees
          </p>
        </div>

        <Link
          to="/add-employee"
          className="btn btn-primary"
        >
          + Add Employee
        </Link>

      </div>

      {/* Search and Filter */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">

        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-8">

              <div className="input-group">

                <span className="input-group-text">
                  🔍
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name or designation..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="col-md-4">

              <select
                className="form-select"
                value={departmentFilter}
                onChange={(e) =>
                  setDepartmentFilter(e.target.value)
                }
              >

                <option value="All">
                  All Departments
                </option>

                {departments.map((department) => (

                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>

                ))}

              </select>

            </div>

          </div>

        </div>

      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-body p-0">

          {filteredEmployees.length === 0 ? (

            <div className="text-center py-5 px-3">

              <div className="empty-icon">
                👥
              </div>

              <h5 className="mt-3">
                No Employees Found
              </h5>

              <p className="text-muted">
                {employees.length === 0
                  ? "Add your first employee to get started."
                  : "Try changing your search or filter."}
              </p>

              {employees.length === 0 && (
                <Link
                  to="/add-employee"
                  className="btn btn-primary"
                >
                  Add Employee
                </Link>
              )}

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredEmployees.map((employee) => (

                    <tr key={employee.id}>

                      <td>
                        #{employee.id}
                      </td>

                      <td className="fw-semibold">
                        {employee.name}
                      </td>

                      <td>
                        <span className="badge bg-primary-subtle text-primary">
                          {employee.department}
                        </span>
                      </td>

                      <td>
                        {employee.designation}
                      </td>

                      <td className="fw-semibold">
                        ₹{formatSalary(employee.salary)}
                      </td>

                      <td>

                        <div className="d-flex gap-2">

                          <Link
                            to={`/employee/${employee.id}`}
                            className="btn btn-sm btn-outline-info"
                            title="View"
                          >
                            View
                          </Link>

                          <Link
                            to={`/edit-employee/${employee.id}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                          >
                            Edit
                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              setDeleteId(employee.id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      {/* Delete Modal */}
      {deleteId !== null && (

        <div
          className="modal-backdrop-custom"
          onClick={() => setDeleteId(null)}
        >

          <div
            className="delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <h4 className="fw-bold">
              Delete Employee?
            </h4>

            <p className="text-muted">
              Are you sure you want to delete this
              employee? This action cannot be undone.
            </p>

            <div className="d-flex justify-content-end gap-2">

              <button
                className="btn btn-secondary"
                onClick={() =>
                  setDeleteId(null)
                }
              >
                Cancel
              </button>

              <button
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default EmployeeList;