import { Navbar, Nav, Container } from "react-bootstrap";
import "./nav.scss";
import { NavLink } from "react-bootstrap";
import logo from "../../assets/logo/logo.png";

export default function Header() {
  return (
    <div className="nav">
      <Navbar collapseOnSelect expand="sm" variant="dark">
        <Container className="nav-container">
          <Navbar.Brand href="/" className="nav-container__box">
            <img
              className="nav-logo d-inline-block align-middle"
              width="200"
              alt="logo-img"
              src={logo}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            className="nav-bar"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <NavLink href="/" className="nav-bar">
                Home
              </NavLink>
              <NavLink href="/product-list" className="nav-bar">
                Product List
              </NavLink>
              <NavLink href="/product-view" className="nav-bar">
                Product View
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
