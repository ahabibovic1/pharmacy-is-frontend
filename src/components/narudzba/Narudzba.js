import React, { Component } from "react";
import { ListGroup, Form, Container, Card, Row, Col, Button, Alert } from "react-bootstrap";
import "./Narudzba.css";
import Stepper from "bs-stepper";
import "bootstrap/dist/css/bootstrap.min.css";
import "bs-stepper/dist/css/bs-stepper.min.css";
import Item from "./Item.js";
import FinalizirajNarudzbu from "./FinalizirajNarudzbu.js";

const mockLijekovi = require("../../mock-data/prikaz_lijekova.json");
const mockKategorije = require("../../mock-data/kategorije.json");

export default class Narudzba extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lijekovi: mockLijekovi,
      SearchTerm: "",
      filtered_lijekovi: mockLijekovi,
      kategorije: mockKategorije,
      filtered_by_kategorija: mockLijekovi,
      kategorija: "",
      narudzba: [],
      vrijednost: 0,
      alertVisible: false,
      alertMssg: ""
    };
    this.editSearchTerm = this.editSearchTerm.bind(this);
    this.changeKategorija = this.changeKategorija.bind(this);
    this.filterByKategorija = this.filterByKategorija.bind(this);
    this.filterBySearch = this.filterBySearch.bind(this);
    this.DodajItem = this.DodajItem.bind(this);
    this.RemoveItem = this.RemoveItem.bind(this);
    this.PromijeniNarudzbu = this.PromijeniNarudzbu.bind(this);
    this.PromijeniVrijednost = this.PromijeniVrijednost.bind(this);
    this.PonistiNarudzbu = this.PonistiNarudzbu.bind(this);
    this.Dalje = this.Dalje.bind(this);
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
  componentDidMount() {
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
  }
  DodajItem(item) {
    var item2 = item;
    item2 = { id: this.state.narudzba.length + 1, naziv: item.naziv, kolicina: item.kolicina, cijena: item.cijena };
    this.setState({ narudzba: this.state.narudzba.concat(item2) }, function () {
      console.log(this.state.narudzba);
    });
    this.setState({ alertVisible: true, alertMssg: "Lijek je dodan" }, () => {
      window.setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
    });
  }
  RemoveItem(id) {
    console.log(id);
    var narudzba1 = this.state.narudzba;
    if (this.state.narudzba.length === 1) narudzba1 = [];
    else narudzba1.splice(id, 1);
    this.setState({ narudzba: narudzba1 }, function () {
      console.log(this.state.narudzba);
      this.PromijeniVrijednost();
    });
  }
  PromijeniNarudzbu(narudzba1) {
    console.log(this.state.vrijednost);
    this.setState({ narudzba: narudzba1 }, function () {
      this.PromijeniVrijednost();
    });
  }
  PromijeniVrijednost() {
    var sum = 0.0;
    this.state.narudzba.forEach((n) => {
      sum = sum + n.kolicina * n.cijena;
    });
    console.log(sum);
    this.setState({ vrijednost: sum });
  }
  PonistiNarudzbu() {
    this.setState({ narudzba: [] }, function () {
      this.PromijeniVrijednost();
    });
  }

  PonistiNarudzbuMain = () => {
    this.setState({ narudzba: [] }, function () {
      console.log(this.state.narudzba);
      this.PromijeniVrijednost();
    });

    this.setState({ alertVisible: true, alertMssg: "Narudžba je poništena" }, () => {
      window.setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
    });
  };

  Dalje() {
    this.stepper.next();
  }
  toggle = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  };
  render() {
    return (
      <div style={{ margin: "20px" }}>
        <div id="stepper1" class="bs-stepper">
          <div class="bs-stepper-header st_hd">
            <div class="step" data-target="#test-l-1">
              <button class="step-trigger">
                <span class="bs-stepper-circle">1</span>
                <span class="bs-stepper-label">Odabir proizvoda</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#test-l-2">
              <button class="step-trigger">
                <span class="bs-stepper-circle">2</span>
                <span class="bs-stepper-label">Finaliziranje narudžbe</span>
              </button>
            </div>
          </div>
          <div class="bs-stepper-content">
            <Alert variant="success" dismissible show={this.state.alertVisible} onClose={this.toggle}>
              {this.state.alertMssg}
            </Alert>
            <form onSubmit={this.onSubmit}>
              <div id="test-l-1" class="content">
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
                  <Container className="search_red">
                    {this.state.filtered_by_kategorija.map((lijek) => (
                      <ListGroup.Item key={lijek.naziv}>
                        <Item naziv={lijek.naziv} kolicina ={1} cijena={lijek.cijena}  narudzba={this.state.narudzba} DodajItem={this.DodajItem} />
                      </ListGroup.Item>
                    ))}
                  </Container>
                </ListGroup>
                <Container>
                  <Button variant="secondary" onClick={this.Dalje} type="button" className="button">
                    Pregledaj narudžbu
                  </Button>
                  <Button variant="danger" onClick={this.PonistiNarudzbuMain} type="button" className="button">
                    Poništi
                  </Button>
                </Container>
              </div>
              <div id="test-l-2" class="content">
                <FinalizirajNarudzbu
                  PonistiNarudzbu={this.PonistiNarudzbu}
                  PromijeniNarudzbu={this.PromijeniNarudzbu}
                  PromijeniVrijednost={this.PromijeniVrijednost}
                  vrijednost={this.state.vrijednost}
                  narudzba={this.state.narudzba}
                  RemoveItem={this.RemoveItem}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
