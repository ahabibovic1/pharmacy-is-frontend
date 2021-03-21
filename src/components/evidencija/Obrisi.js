import React, { Component } from "react";
import { ListGroup, Card, Alert, Form, Container, Row, Col, Button, Modal } from "react-bootstrap";
import PaginationList from 'react-pagination-list';
import ItemObrisi from "./ItemObrisi";
const mockLijekovi = require("../../mock-data/prikaz_lijekova.json");
const mockKategorije = require("../../mock-data/kategorije.json");

export default class Obrisi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lijekovi: mockLijekovi,
      SearchTerm: "",
      filtered_lijekovi: mockLijekovi,
      kategorije: mockKategorije,
      filtered_by_kategorija: mockLijekovi,
      kategorija: "",
      show: false,
      lijek_naziv: "lijek 1",
      indeks: 0,
      alertVisible: false,
    };
    this.editSearchTerm = this.editSearchTerm.bind(this);
    this.changeKategorija = this.changeKategorija.bind(this);
    this.filterByKategorija = this.filterByKategorija.bind(this);
    this.filterBySearch = this.filterBySearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.hadleObrisi = this.hadleObrisi.bind(this);
  }
  editSearchTerm(e) {
    this.setState({ SearchTerm: e.target.value }, function () {
      this.filterBySearch();
    });
  }

  filterBySearch() {
    this.setState({ filtered_lijekovi: this.state.lijekovi.filter((lijek) => lijek.naziv.toLowerCase().includes(this.state.SearchTerm.toLowerCase())) }, function () {
      this.filterByKategorija();
    });
  }

  filterByKategorija() {
    if (this.state.kategorija !== "") this.setState({ filtered_by_kategorija: this.state.filtered_lijekovi.filter((lijek) => lijek.kategorija === this.state.kategorija) });
    else this.setState({ filtered_by_kategorija: this.state.filtered_lijekovi });
  }

  changeKategorija(e) {
    this.setState({ kategorija: e.target.value }, this.filterBySearch());
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow(naziv, i) {
    this.setState({ lijek_naziv: naziv }, function () {
      this.setState({ show: true }, function () {
        this.setState({ indeks: i });
      });
    });
  }
  hadleObrisi() {
    var lijekovi = this.state.filtered_by_kategorija;
    lijekovi.splice(this.state.indeks, 1);
    this.setState({ filtered_by_kategorija: lijekovi }, function () {
      this.handleClose();
    });
    this.setState({ alertVisible: true }, () => {
      window.setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
    });
  }
  toggle = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  };
  render() {
    return (
      <div>
        <Alert variant="success" dismissible show={this.state.alertVisible} onClose={this.toggle}>
          Lijek je uspješno obrisan
        </Alert>
       
        <Container>
          <Row>
            <Col>
              <Form.Label>Pretraga</Form.Label>
              <input className="form-control search" type="text" onChange={this.editSearchTerm} placeholder="Pretraži proizvode" />
            </Col>
            <Col>
              <Form.Label>Odabir kategorije</Form.Label>
              <Form.Control as="select" onChange={this.changeKategorija}>
                <option value="" key={-1}>
                  {" "}
                  Sve kategorije
                </option>
                {this.state.kategorije.map((kategorija) => (
                  <option key={kategorija.id} value={kategorija.naziv}>
                    {" "}
                    {kategorija.naziv}{" "}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
        </Container>
        <ListGroup style ={{"overflow": "auto", height:"600px", "overflow-x": "hidden"}}>
          <Container className="search_red" >
            {this.state.filtered_by_kategorija.map((lijek, i) => (
              <ListGroup.Item key={lijek.naziv}>
                <ItemObrisi handleShow={this.handleShow} i={i} lijek={lijek} narudzba={this.state.narudzba} />
              </ListGroup.Item>
            ))}
          </Container>
        </ListGroup>
      
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Potvrda narudžbe</Modal.Title>
          </Modal.Header>
          <Modal.Body>Da li ste sigurni da želite obrisati {this.state.lijek_naziv}? </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className="modal-button" onClick={this.handleClose}>
              Ne
            </Button>
            <Button variant="secondary" className="modal-button" onClick={this.hadleObrisi}>
              Da
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
