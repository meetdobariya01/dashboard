import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./header.css";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="tolvv-header shadow-sm mb-5">
        <Navbar expand="lg" expanded={expanded} className="container">
          
          {/* Mobile Toggle */}
          <Navbar.Toggle
            aria-controls="navbar-nav"
            className="border-0"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          >
            {expanded ? <FiX size={26} /> : <FiMenu size={26} />}
          </Navbar.Toggle>

          {/* CENTER LOGO (Mobile) */}
          <Navbar.Brand className="mx-auto d-lg-none">
            <img
              src="/images/logo-1.png"
              className="tolvv-logo"
              alt="TOLVV"
            />
          </Navbar.Brand>

          <Navbar.Collapse id="navbar-nav">
            
            {/* CENTER LOGO (Desktop) */}
            <div className="d-none d-lg-flex justify-content-center mx-4">
              <NavLink to="/admin/dashboard" className="logo-link">
                <img
                  src="/images/logo-1.png"
                  className="tolvv-logo"
                  alt="TOLVV"
                />
              </NavLink>
            </div>

            {/* MENU */}
            <Nav className="left-nav d-flex align-items-center gap-5 mx-auto">
              <NavLink className="menu-text" to="/admin/dashboard">HOME</NavLink>
              <NavLink className="menu-text" to="/product">PRODUCTS</NavLink>
              <NavLink className="menu-text" to="/orders">ORDER</NavLink>
              <NavLink className="menu-text" to="/orders-tracking">TRACK</NavLink>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
      </header>

      {/* SEARCH OVERLAY */}
      {showSearch && (
        <div className="search-overlay">
          <div className="search-box">
            <input type="text" placeholder="Search..." autoFocus />
            <button className="close-btn" onClick={() => setShowSearch(false)}>
              <FiX size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
