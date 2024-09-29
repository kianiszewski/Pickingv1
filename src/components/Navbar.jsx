import React from 'react'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav 
      className="navbar navbar-expand-lg bg-dark navbar-dark container-fluid" 
      data-bs-theme="dark"
    >
      <Link className="navbar-brand ms-3" to="/">Home</Link> {/* Added margin-left using Bootstrap class 'ms-3' */}
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/trabajos-registrados">Trabajos Registrados</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/trabajos-terminados">Trabajos Terminados</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
