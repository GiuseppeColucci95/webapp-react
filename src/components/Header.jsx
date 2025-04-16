import { NavLink } from "react-router-dom";

export default function Header() {

  return (

    <nav className="navbar navbar-expand navbar-light bg-warning">
      <div className="nav navbar-nav mx-3">
        <NavLink className="nav-link" to='/'>Home</NavLink>
      </div>
    </nav>
  );
}