import { Link, useParams } from "react-router-dom";

function EmployeeDetails({ employees }) {

  const { id } = useParams();

  const employee = employees.find(
    (emp) => String(emp.id) === String(id)
  );

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

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-7">

          <div className="card border-0 shadow-lg rounded-4">

            <div className="card-body p-5">

              <div className="text-center mb-4">

                <div className="employee-avatar">
                  {employee.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <h2 className="fw-bold mt-3">
                  {employee.name}
                </h2>

                <p className="text-muted">
                  {employee.designation}
                </p>

              </div>

              <hr />

              <div className="row g-4 mt-2">

                <div className="col-md-6">

                  <p className="text-muted mb-1">
                    Employee ID
                  </p>

                  <h6>
                    #{employee.id}
                  </h6>

                </div>

                <div className="col-md-6">

                  <p className="text-muted mb-1">
                    Department
                  </p>

                  <h6>
                    {employee.department}
                  </h6>

                </div>

                <div className="col-md-6">

                  <p className="text-muted mb-1">
                    Designation
                  </p>

                  <h6>
                    {employee.designation}
                  </h6>

                </div>

                <div className="col-md-6">

                  <p className="text-muted mb-1">
                    Salary
                  </p>

                  <h6>
                    ₹
                    {Number(
                      employee.salary
                    ).toLocaleString("en-IN")}
                  </h6>

                </div>

              </div>

              <div className="mt-5 d-flex gap-2">

                <Link
                  to="/employees"
                  className="btn btn-outline-secondary"
                >
                  Back
                </Link>

                <Link
                  to={`/edit-employee/${employee.id}`}
                  className="btn btn-primary"
                >
                  Edit Employee
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeDetails;