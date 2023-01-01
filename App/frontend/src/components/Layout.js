import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import '../styles/layout.css'
import useAuth from '../hooks/useAuth';
import user from '../styles/user.png'
import '../styles/search.css';

const Layout = () => {

    const [toggle, setToggle] = useState(true);
    const navigate = useNavigate();
    const logout = useLogout();
    const { auth } = useAuth();
  
    const signOut = async () => {
      await logout();
      navigate("/login");
    };

const navbar = ()=>{
    return (

            <nav className="navbar navbar-dark bg-dark justify-content-between navbar-head">
                <a className="navbar-brand"> <h1>Database Dealers</h1> </a>
                <div className="nav" >
                    <span className="nav-item" >
                        <a className="nav-link" href="/" style={{"color":"white"}}> Search </a>
                    </span>
                    <span className="nav-item">
                        <a className="nav-link" href="/cart" style={{"color":"white"}}> Cart </a>
                    </span>
                    <span className="nav-item">
                        <a className="nav-link" href="/global" style={{"color":"white"}}> Inventory </a>
                    </span>
                    <button className="btn btn-danger" onClick={signOut}>
                        Logout
                    </button>
                </div>
            </nav>
    );
}

const sidebar = ()=>{
    return (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar"
        style={{"width": "280px"}}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Search Page</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Filters
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Sort by price : min
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Sort by price : max
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Sort by Rating
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Sort by Sentiment Analysis
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={user}
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>{auth?.user}</strong>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="#">
                Delete Account
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Update Account
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }


    return (
    <main className="App">
        {navbar()}
        <div className="content-area">
            {sidebar()}
            <Outlet />
        </div>
    </main>
  );
};

export default Layout;
