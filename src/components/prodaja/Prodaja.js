import React, { Component } from "react";
import { Card, ListGroup, Form, Button, Table, Alert, Modal } from "react-bootstrap";
import "./Prodaja.css";
import { getRandomInt } from "../../helpers/RandomInteger";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { getObject } from "../../helpers/utils";
var lijekovi = require("../../mock-data/lijekovi.json");

export default class Prodaja extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operater: "Amra Habibovic",
      kasa: "01",
      apoteka: "Apoteka Socijalno",
      datum: new Date().toLocaleString(),
      brojRacuna: getRandomInt(),
      vrijednostRacuna: 0,
      barcode: "",
      sifraArtikla: "",
      sifraKartona: "",
      kolicina: 1,
      artikli: [],
      showInfo: false,
      showModal: false,
      showModalPonisti: false,
      total: 0,
      lijek: lijekovi[0],
      alertVisible: false,
      alertMssg: "",
      alertVariant: "",
    };
  }

  showInfo = (row) => {
    lijekovi.forEach((e) => {
      if (e.naziv === row.target.innerText) {
        this.setState({ lijek: e });
      }
    });

    this.setState({ showInfo: true });
  };

  ponistiUnos = () => {
    this.setState({ barcode: "", sifraKartona: "", sifraArtikla: "", kolicina: 1 });
  };

  unosBarcode = (e) => {
    this.setState({ barcode: e.target.value });
  };

  unosSifraKartona = (e) => {
    this.setState({ sifraKartona: e.target.value });
  };

  unosSifra = (e) => {
    this.setState({ sifraArtikla: e.target.value });
  };

  unosKolicina = (e) => {
    this.setState({ kolicina: e.target.value });
  };

  dodajArtikal = (e) => {
    e.preventDefault();
    if (this.state.sifraArtikla === "") return;

    var lijek = getObject(lijekovi, "sifra", this.state.sifraArtikla);
    if (lijek === null) {
      this.setState({ alertVisible: true, alertVariant: "danger", alertMssg: "Lijek sa unesenom šifrom ne postoji" }, () => {
        window.setTimeout(() => {
          this.setState({ alertVisible: false });
        }, 5000);
      });
      return;
    }
    lijek["kolicina"] = this.state.kolicina;
    this.setState({ lijek: lijek });

    this.setState({
      artikli: [...this.state.artikli, lijek],
      vrijednostRacuna: this.state.vrijednostRacuna + lijek.cijena * this.state.kolicina,
    });
    this.ponistiUnos();
  };

  ponistiSve = () => {
    this.setState({ showModalPonisti: true });
  };

  ponistiSveModal = () => {
    this.setState({ artikli: [], vrijednostRacuna: 0 });
    this.handleClosePonisti();
    this.setState({ alertVisible: true, alertVariant: "success", alertMssg: "Naplata je uspješno otkazana" }, () => {
      window.setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
    });
  };

  naplati = () => {
    this.setState({ showModal: true });
  };

  toggle = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleClosePonisti = () => {
    this.setState({ showModalPonisti: false });
  };

  handleNaplata = () => {
    this.setState({ showModal: false });
    this.setState({ alertVisible: true, alertVariant: "success", alertMssg: "Naplata je uspješno izvršena" }, () => {
      window.setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
    });
    this.setState({ artikli: [], vrijednostRacuna: 0 });
  };

  handleCloseInfo = () => {
    this.setState({ showInfo: false });
  };

  obrisiArtikal = (row) => {
    var temp = this.state.artikli;
    var idx = temp.findIndex((p) => p.sifra === row.target.value);
    var removed = temp.splice(idx, 1);

    this.setState({
      artikli: temp,
      vrijednostRacuna: this.state.vrijednostRacuna - removed[0].cijena * removed[0].kolicina,
    });
  };

  renderTableData = (row, index) => {
    return (
      <tr key={index}>
        <td>{row.sifra}</td>
        <td>
          <a href="/#/prodaja" onClick={this.showInfo}>
            {row.naziv}
          </a>
        </td>

        <td>{row.kolicina}</td>
        <td>{row.cijena.toFixed(2)}</td>
        <td style={{ textAlign: "center" }}>
          <Button variant="danger" data-value={row.kolicina} value={row.sifra} onClick={this.obrisiArtikal} style={{ margin: "0px", padding: "2px 8px" }}>
            X
          </Button>
        </td>
      </tr>
    );
  };

  render() {
    return (
      <div className="div-prodaja">
        <Alert variant={this.state.alertVariant} dismissible show={this.state.alertVisible} onClose={this.toggle}>
          {this.state.alertMssg}
        </Alert>
        <div className="racun">
          <Card style={{ width: "30%", height: "100%" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>{this.state.apoteka}</ListGroup.Item>
              <ListGroup.Item>Kasa: {this.state.kasa}</ListGroup.Item>
              <ListGroup.Item>Operater: {this.state.operater}</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card style={{ width: "30%", height: "100%" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>Datum: {this.state.datum}</ListGroup.Item>
              <ListGroup.Item>Broj računa: {this.state.brojRacuna}</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card style={{ width: "30%", height: "100%" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>Vrijednost računa</ListGroup.Item>
              <ListGroup.Item style={{ fontSize: "60px" }}>{(Math.round(this.state.vrijednostRacuna * 100) / 100).toFixed(2)} KM</ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
        <div className="artikli">
          <div style={{ width: "30%" }}>
            <form onSubmit={this.dodajArtikal}>
              <Form.Group>
                <div className="form-inline" style={{ width: "100%" }}>
                  <label style={{ marginRight: "10px" }}>Barcode</label>
                  <Form.Control type="text" readOnly style={{ width: "50%", marginLeft: "auto" }} onChange={this.unosBarcode} value={this.state.barcode} />
                </div>
                <br />
                <div className="form-inline" style={{ width: "100%" }}>
                  <label style={{ marginRight: "10px" }}>Šifra kartona</label>
                  <Form.Control type="text" readOnly style={{ width: "50%", marginLeft: "auto" }} onChange={this.unosSifraKartona} value={this.state.sifraKartona} />
                </div>
                <br />
                <div className="form-inline">
                  <label>Šifra artikla</label>
                  <Form.Control type="text" style={{ width: "50%", marginLeft: "auto" }} onChange={this.unosSifra} value={this.state.sifraArtikla} />
                </div>
                <br />
                <div className="form-inline">
                  <label>Količina</label>
                  <Form.Control type="number" min="1" style={{ width: "50%", marginLeft: "auto" }} onChange={this.unosKolicina} value={this.state.kolicina} />
                </div>
                <div className="div-buttons">
                  <Button variant="danger" className="button" onClick={this.ponistiUnos}>
                    Poništi
                  </Button>
                  <Button variant="secondary" type="submit" className="button" onSubmit={this.dodajArtikal}>
                    Dodaj
                  </Button>
                </div>
              </Form.Group>
            </form>
          </div>
          <div style={{ width: "60%", overflow: "auto", "max-height": "500px", "overflow-x": "hidden" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Šifra</th>
                  <th>Naziv</th>
                  <th>Količina</th>
                  <th>Cijena</th>
                  <th style={{ border: "0 solid Transparent!important" }}></th>
                </tr>
              </thead>
              <tbody>{this.state.artikli.length !== 0 ? this.state.artikli.map(this.renderTableData) : null}</tbody>
            </Table>
          </div>
        </div>
        <div className="div-buttons" style={{ alignSelf: "flex-end", margin: "20px" }}>
          <Button variant="danger" className="button" onClick={this.ponistiSve}>
            Poništi
          </Button>
          <Button variant="secondary" className="button" onClick={this.naplati}>
            Naplati
          </Button>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Potvrda naplate</Modal.Title>
          </Modal.Header>
          <Modal.Body>Da li ste sigurni da želite izvršiti naplatu? </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className="modal-button" onClick={this.handleClose}>
              Ne
            </Button>
            <Button variant="secondary" className="modal-button" onClick={this.handleNaplata}>
              Da
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showModalPonisti} onHide={this.handleClosePonisti}>
          <Modal.Header closeButton>
            <Modal.Title>Otkazivanje naplate</Modal.Title>
          </Modal.Header>
          <Modal.Body>Da li ste sigurni da želite otkazati naplatu? </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className="modal-button" onClick={this.handleClosePonisti}>
              Ne
            </Button>
            <Button variant="secondary" className="modal-button" onClick={this.ponistiSveModal}>
              Da
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showInfo} onHide={this.handleCloseInfo}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <strong>Naziv</strong>
            <br />
            <label>{this.state.lijek.naziv}</label>
            <br />
            <strong>Opis</strong>

            <p>{this.state.lijek.opis}</p>
            <strong>Sastav</strong>
            <div className="list-div">
              <div>
                {this.state.lijek.sastav.map((e) => (
                  <li>{e}</li>
                ))}
              </div>
              <br />
              <strong>Nus pojave</strong>
              <div>
                {this.state.lijek.nusPojave.map((e) => (
                  <li>{e}</li>
                ))}
              </div>
              <br />
              <strong>Kontradikcije</strong>
              <div>
                {this.state.lijek.kontradikcije.map((e) => (
                  <li>{e}</li>
                ))}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
