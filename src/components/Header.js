import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import logo from "./snake.png";
import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: localStorage.getItem("naviKey"),
    };
  }
  selectedNav = (e) => {
    localStorage.setItem("naviKey", e.toString());
  };
  noSelected = (e) => {
    localStorage.setItem("naviKey", "");
  };
  render() {
    return (
      <div>
        <Navbar bg="light">
          <div>
            <img src={logo} alt="logo" style={{ marginRight: "10px", width: "40px" }} />
            <Navbar.Brand onClick={this.noSelected} href="/#">
              Informacioni sistem apoteke
            </Navbar.Brand>
          </div>
          <Nav className="mr-auto" onSelect={this.selectedNav} activeKey={this.state.key}>
            <Nav.Link href="/#prodaja" eventKey="1">
              Prodaja
            </Nav.Link>
            <Nav.Link href="/#narudzba" eventKey="2">
              Narudžba
            </Nav.Link>
            <Nav.Link href="/#evidencija" eventKey="3">
              Evidencija
            </Nav.Link>
            <Nav.Link href="/#izvjestaj" eventKey="4">
              Izvještaj
            </Nav.Link>
            <Nav.Link href="/#temperatura" eventKey="5">
              Temperatura
            </Nav.Link>
          </Nav>
          <Nav onSelect={this.noSelected} style={{ float: "right" }}>
            <Nav.Link href="/#pomoc" style={{ float: "right" }}>
              Pomoć
            </Nav.Link>
            <Nav.Link href="/#logout" style={{ float: "right" }}>
              Odjava
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
