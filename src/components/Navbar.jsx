import { NavLink } from "react-router-dom";

function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">

      <div className="container">

        <NavLink
          to="/"
          className="navbar-brand fw-bold"
        >
          👥 Employee Manager
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">

              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "active fw-bold" : ""
                  }`
                }
              >
                Dashboard
              </NavLink>

            </li>

            <li className="nav-item">

              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "active fw-bold" : ""
                  }`
                }
              >
                Employees
              </NavLink>

            </li>

            <li className="nav-item">

              <NavLink
                to="/add-employee"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "active fw-bold" : ""
                  }`
                }
              >
                Add Employee
              </NavLink>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;