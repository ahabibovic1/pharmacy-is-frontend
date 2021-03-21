import React, { Component } from "react";
import { ListGroup, Form, Alert, Modal, Row, Col, Button, Card } from "react-bootstrap";
import "./Dodaj.css";
const mockKategorije = require("../../mock-data/kategorije.json");

export default class Dodaj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supstance: [
        { id: 1, naziv: "supstanca 1", selected: false },
        { id: 2, naziv: "supstanca 2", selected: false },
        { id: 3, naziv: "supstanca 3", selected: false },
        { id: 4, naziv: "supstanca 4", selected: false },
        { id: 5, naziv: "supstanca 5", selected: false },
      ],
      magistralni: false,
      naziv: "",
      cijena: "",
      opis: "",
      nus_pojave: "",
      sastav: "",
      kontradikcija: "",
      esencijalni: false,
      show: false,
      alertVisible: false,
      message: " Dodavanje lijeka je uspješno izvršeno",
      novaSupstanca: false,
      novaSupstancaNaziv: "",
      validated: false,
      kategorija: "Kategorija A",
      kategorije: mockKategorije,
    };
    this.handleChangeMagistralni = this.handleChangeMagistralni.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
    this.unosNaziva = this.unosNaziva.bind(this);
    this.unosCijene = this.unosCijene.bind(this);
    this.unosKontradikcija = this.unosKontradikcija.bind(this);
    this.unosNus = this.unosNus.bind(this);
    this.unosOpisa = this.unosOpisa.bind(this);
    this.unosSastav = this.unosSastav.bind(this);
    this.handleChangeEsencijalni = this.handleChangeEsencijalni.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.DodajLijek = this.DodajLijek.bind(this);
  }
  handleChangeMagistralni(e) {
    this.setState({ magistralni: e.target.checked }, function () {});
  }
  handleShow() {
    this.setState({ show: true });
  }
  unosNaziva(e) {
    this.setState({ naziv: e.target.value });
  }
  unosNoveSupstance = (e) => {
    this.setState({ novaSupstancaNaziv: e.target.value });
  };
  unosCijene(e) {
    this.setState({ cijena: e.target.value });
  }
  unosOpisa(e) {
    this.setState({ opis: e.target.value });
  }
  unosNus(e) {
    this.setState({ nus_pojave: e.target.value });
  }
  unosSastav(e) {
    this.setState({ sastav: e.target.value });
  }
  unosKontradikcija(e) {
    this.setState({ kontradikcija: e.target.value });
  }
  handleChangeEsencijalni(e) {
    this.setState({ esencijalni: e.target.checked });
  }
  clearInputs() {
    this.setState({ validated: false });
    this.setState({ magistralni: false, novaSupstanca: false, novaSupstancaNaziv: "", naziv: "", cijena: "", opis: "", nus_pojave: "", sastav: "", kontradikcija: "", esencijalni: false }, () => {
      this.otkaziSupstance();
    });
  }
  handleClose() {
    this.setState({ show: false });
  }
  changeKategorija = (e) => {
    this.setState({ kategorija: e.target.value });
  };
  DodajLijek() {
    this.setState({ alertVisible: true, message: " Dodavanje lijeka je uspješno izvršeno" }, () => {
      this.setState({ show: false });
      this.clearInputs();
      window.setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
    });
  }
  DodajSupstance = () => {
    this.setState({ alertVisible: true, message: "Dodavanje supstanci je uspješno izvršeno" }, () => {
      this.setState({ show: false });
      window.setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
    });
  };
  onCheck = (supstanca, e) => {
    var supstance2 = this.state.supstance;
    supstance2[supstanca.id - 1].selected = e.target.checked;
    this.setState({ supstance: supstance2 });
  };
  otkaziSupstance = () => {
    var supstance2 = this.state.supstance;
    supstance2.map((supstanca) => {
      supstanca.selected = false;
    });
    this.setState({ supstance: supstance2 });
  };
  toggle = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  };
  prikaziNovuSupstancu = () => {
    this.setState({ novaSupstanca: true });
  };
  dodajNovuSupstancu = () => {
    var sup = { id: this.state.supstance.length + 1, naziv: this.state.novaSupstancaNaziv, selected: false };
    this.setState({ supstance: this.state.supstance.concat(sup), novaSupstancaNaziv: "" });
  };
  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      event.preventDefault();
      this.handleShow();
    }
  };
  render() {
    const magistralni = this.state.magistralni;
    const novaSupstanca = this.state.novaSupstanca;
    return (
      <div>
        <Alert variant="success" dismissible show={this.state.alertVisible} onClose={this.toggle}>
          {this.state.message}
        </Alert>
        
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={6}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control required placeholder="Naziv" onChange={this.unosNaziva} value={this.state.naziv} />
                    <Form.Control.Feedback type="invalid">Naziv lijeka se mora unijeti</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control required placeholder="Cijena" step="0.01" type="number" min="0" onChange={this.unosCijene} value={this.state.cijena} />
                    <Form.Control.Feedback type="invalid">Cijena lijeka se mora unijeti</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Kategorija</Form.Label>
                <Form.Control as="select" onChange={this.changeKategorija}>
                  {this.state.kategorije.map((kategorija) => (
                    <option key={kategorija.id} value={kategorija.naziv}>
                      {" "}
                      {kategorija.naziv}{" "}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Opis</Form.Label>
                <Form.Control required as="textarea" placeholder="Opis" onChange={this.unosOpisa} value={this.state.opis} rows={2} />
                <Form.Control.Feedback type="invalid">Opis lijeka se mora unijeti</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Nus pojave</Form.Label>
                <Form.Control as="textarea" placeholder="Nus pojave" onChange={this.unosNus} value={this.state.nus_pojave} rows={2} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Sastav</Form.Label>
                <Form.Control as="textarea" placeholder="Sastav" rows={2} onChange={this.unosSastav} value={this.state.sastav} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Kontradikcija</Form.Label>
                <Form.Control as="textarea" placeholder="Kontradikcija" rows={2} onChange={this.unosKontradikcija} value={this.state.kontradikcija} />
              </Form.Group>
            </Col>

            <Col>
              <Row>
                <Card className="tip">
                  <Card.Body>
                    <Form.Check type="checkbox" onChange={this.handleChangeEsencijalni} checked={this.state.esencijalni} label="Esencijalni lijek" />
                  </Card.Body>
                </Card>
              </Row>
              <Row>
                <Card className="tip">
                  <Card.Body>
                    <Form.Check type="checkbox" checked={this.state.magistralni} onChange={this.handleChangeMagistralni} label="Magistralni lijek" />
                  </Card.Body>
                </Card>
              </Row>
              <Row>
                {magistralni ? (
                  <Card className="tip" style={{ width: "70%" }}>
                    <Card.Body>
                      <Card.Title>Odabir supstanci</Card.Title>
                      <ListGroup variant="flush">
                        {this.state.supstance.map((supstanca, i) => (
                          <Form.Check
                            key={supstanca.id}
                            onChange={(e) => {
                              this.onCheck(supstanca, e);
                            }}
                            type="checkbox"
                            checked={supstanca.selected}
                            className="checkovi"
                            label={supstanca.naziv}
                          />
                        ))}
                      </ListGroup>
                      {novaSupstanca ? (
                        <Row>
                          <Col style={{ paddingLeft: "10%", paddingTop: "2%", paddingBottom: "2%" }}>
                            <Form.Control onChange={this.unosNoveSupstance} value={this.state.novaSupstancaNaziv} />
                          </Col>
                          <Col style={{ paddingTop: "3%", paddingBottom: "2%" }}>
                            <Button variant="secondary" size="sm" onClick={this.dodajNovuSupstancu}>
                              Dodaj
                            </Button>
                          </Col>
                        </Row>
                      ) : (
                        <div></div>
                      )}
                      <Row>
                        <Button variant="light" onClick={this.prikaziNovuSupstancu}>
                          + Dodaj drugu supstancu
                        </Button>
                      </Row>
                      <Row className="supstanceButton" style={{ marginLeft: "20px" }}>
                        <Col>
                          <Button variant="danger" style={{ width: "80%" }} onClick={this.otkaziSupstance}>
                            Poništi
                          </Button>
                        </Col>
                        <Col>
                          <Button variant="secondary" style={{ width: "80%" }} onClick={this.DodajSupstance}>
                            Dodaj
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ) : (
                  <div></div>
                )}
              </Row>
            </Col>
          </Row>
          <Row className="endButton" style={{ float: "right", marginRight: "70px" }}>
            <Button variant="danger" onClick={this.clearInputs} className="button">
              Poništi
            </Button>
            <Button variant="secondary" type="submit" /*onClick={this.handleSubmit}*/ /*onClick={this.handleShow}*/ className="button">
              Sačuvaj
            </Button>
          </Row>
        </Form>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Unos lijeka</Modal.Title>
          </Modal.Header>
          <Modal.Body>Da li želite unijeti {this.state.naziv}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose} className="modal-button">
              Ne
            </Button>
            <Button variant="secondary" onClick={this.DodajLijek} className="modal-button">
              Da
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
