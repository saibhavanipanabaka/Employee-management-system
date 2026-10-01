import { Link } from "react-router-dom";

function Dashboard({ employees }) {
  const totalEmployees = employees.length;

  const departments = [
    ...new Set(
      employees
        .map((employee) => employee.department)
        .filter(Boolean)
    ),
  ];

  const totalSalary = employees.reduce(
    (total, employee) =>
      total + Number(employee.salary || 0),
    0
  );

  const averageSalary =
    totalEmployees > 0
      ? totalSalary / totalEmployees
      : 0;

  const formatSalary = (salary) => {
    return Number(salary).toLocaleString("en-IN");
  };

  const recentEmployees = [...employees].slice(-5).reverse();

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="dashboard-header mb-4">
        <div>
          <h1 className="fw-bold mb-1">
            Dashboard
          </h1>

          <p className="text-muted mb-0">
            Welcome to your Employee Management System
          </p>
        </div>

        <Link
          to="/add-employee"
          className="btn btn-primary"
        >
          + Add Employee
        </Link>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-4">

        <div className="col-md-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-icon">
              👥
            </div>

            <div>
              <p className="text-muted mb-1">
                Total Employees
              </p>

              <h3 className="fw-bold mb-0">
                {totalEmployees}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-icon">
              🏢
            </div>

            <div>
              <p className="text-muted mb-1">
                Departments
              </p>

              <h3 className="fw-bold mb-0">
                {departments.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-icon">
              💰
            </div>

            <div>
              <p className="text-muted mb-1">
                Total Salary
              </p>

              <h3 className="fw-bold mb-0">
                ₹{formatSalary(totalSalary)}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-icon">
              📊
            </div>

            <div>
              <p className="text-muted mb-1">
                Average Salary
              </p>

              <h3 className="fw-bold mb-0">
                ₹{formatSalary(Math.round(averageSalary))}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Employees */}
      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center">

          <div>
            <h4 className="fw-bold mb-1">
              Recent Employees
            </h4>

            <p className="text-muted mb-0">
              Recently added employees
            </p>
          </div>

          <Link
            to="/employees"
            className="btn btn-outline-primary btn-sm"
          >
            View All
          </Link>

        </div>

        <div className="card-body p-0">

          {recentEmployees.length === 0 ? (

            <div className="text-center py-5">

              <div className="empty-icon">
                👥
              </div>

              <h5 className="mt-3">
                No Employees Yet
              </h5>

              <p className="text-muted">
                Start by adding your first employee.
              </p>

              <Link
                to="/add-employee"
                className="btn btn-primary"
              >
                Add Employee
              </Link>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead className="table-light">

                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Salary</th>
                  </tr>

                </thead>

                <tbody>

                  {recentEmployees.map((employee) => (

                    <tr key={employee.id}>

                      <td>
                        #{employee.id}
                      </td>

                      <td className="fw-semibold">
                        {employee.name}
                      </td>

                      <td>
                        {employee.department}
                      </td>

                      <td>
                        {employee.designation}
                      </td>

                      <td>
                        ₹{formatSalary(employee.salary)}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;