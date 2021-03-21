import React, { Component } from "react";
import { Nav, Tab, Col, Row } from "react-bootstrap";
import Dodaj from "./Dodaj";
import Obrisi from "./Obrisi";
import Azuriraj from "./Azuriraj";
export default class Evidencija extends Component {
  render() {
    return (
      <div style={{ margin: "20px" }}>
        <Tab.Container  defaultActiveKey="dodaj">
          <Row>
            <Col sm={2}>
              <Nav variant="pills" defaultActiveKey="dodaj" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="dodaj">Dodavanje lijeka</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="azuriraj">Pregled lijekova</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="obrisi">Brisanje lijeka</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} >
              <Tab.Content>
                <Tab.Pane eventKey="dodaj">
                  <Dodaj />
                </Tab.Pane>
                <Tab.Pane eventKey="obrisi">
                  <Obrisi />
                </Tab.Pane>
                <Tab.Pane eventKey="azuriraj">
                  <Azuriraj />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}
