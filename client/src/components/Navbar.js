import React from "react";
import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo.png';

export default function Navbar({currentUser}) {
  
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <img className="navbar-brand" src={Logo} height="70px"/>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li class="nav-item">
              <NavLink className="nav-link" to="/books">Browse Books</NavLink>
              </li>
              <li class="nav-item">
              <NavLink className="nav-link" to="/mybooks">My Books</NavLink>
              </li>
              <li class="nav-item">
              <NavLink className="nav-link" to="/mymessages">My Messages</NavLink>
              </li>
            </ul>
            <span class="navbar-text me-3">
              Log Out
            </span>
      </div>
      </div>
    </nav>

  );
}

