import React, { Component } from "react";
import { Button, Form, Row, Col, Table, Modal, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Izvjestaj.css";

var mockData = require("../../mock-data/izvjestaj.json");

export default class Izvjestaj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      gotovinsko: false,
      karticno: false,
      esencijalni: false,
      tableData: [],
      ukupno: 0.0,
      show: false,
      alertVisible: false,
      alertMssg: "",
      alertVariant: "success",
    };
  }

  handleGotovinsko = () => {
    this.setState({ gotovinsko: !this.state.gotovinsko });
  };

  handleKarticno = () => {
    this.setState({ karticno: !this.state.karticno });
  };

  handleEsencijalni = () => {
    this.setState({ esencijalni: !this.state.esencijalni });
  };

  prikazi = () => {
    let period = "ostalo";
    if (this.state.endDate - this.state.startDate >= 2592000000) {
      period = "mjesec";
    }

    if (this.state.endDate - this.state.startDate < 0) {
      this.setState({ alertVisible: true, alertVariant: "danger", alertMssg: "Krajnji datum mora biti veći od početnog datuma" }, () => {
        window.setTimeout(() => {
          this.setState({ alertVisible: false });
        }, 5000);
      });
      return;
    }

    const [t1, t2, t3] = [this.state.gotovinsko, this.state.karticno, this.state.esencijalni];

    let result = mockData.filter(function (v, i) {
      if (t1 && t2 && t3) {
        return v["period"] === period;
      } else if (t1 && t2) {
        return v["period"] === period && (v["placanje"] === "gotovinsko" || v["placanje"] === "karticno");
      } else if (t1 && t3) {
        return v["period"] === period && (v["placanje"] === "gotovinsko" || v["placanje"] === "esencijalni");
      } else if (t3 && t2) {
        return v["period"] === period && (v["placanje"] === "esencijalni" || v["placanje"] === "karticno");
      } else if (t1) {
        return v["period"] === period && v["placanje"] === "gotovinsko";
      } else if (t2) {
        return v["period"] === period && v["placanje"] === "karticno";
      } else if (t3) {
        return v["period"] === period && v["placanje"] === "esencijalni";
      }
    });

    this.setState({ tableData: result });
    let sum = 0;
    result.map((v) => {
      sum += parseFloat(v["cijena"]) * parseFloat(v["kolicina"]);
    });
    this.setState({ ukupno: sum });
  };

  renderTableData = (row, index) => {
    return (
      <tr key={index}>
        <td>{row.sifra}</td>
        <td>{row.naziv}</td>
        <td>{row.kolicina}</td>
        <td>{row.cijena}</td>
      </tr>
    );
  };

  isprintaj = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handlePrint = () => {
    this.handleClose();

    this.setState({ alertVisible: true, alertVariant: "success", alertMssg: "Printanje je uspješno izvršeno" }, () => {
      window.setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
    });
  };

  toggle = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  };

  render() {
    return (
      <div className="div-glavni">
        <Alert variant={this.state.alertVariant} dismissible show={this.state.alertVisible} onClose={this.toggle}>
          {this.state.alertMssg}
        </Alert>
        <div className="div-prvi">
          <div className="div-date">
            <Form>
              <Row>
                <Col>
                  <Form.Label>Početak</Form.Label>
                </Col>
                <Col>
                  <DatePicker
                    minDate={null}
                    maxDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                    selected={this.state.startDate}
                    onChange={this.handleDateChange}
                    onChange={(date) => this.setState({ startDate: date })}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Form.Label>Kraj</Form.Label>
                </Col>
                <Col>
                  <DatePicker minDate={null} maxDate={new Date()} dateFormat="dd-MM-yyyy" selected={this.state.endDate} onChange={(date) => this.setState({ endDate: date })} />
                </Col>
              </Row>
            </Form>
          </div>
          <div className="div-radio">
            <Form>
              <Form.Check onChange={this.handleGotovinsko} type="checkbox" label="Gotovinsko plaćanje" />
              <Form.Check onChange={this.handleKarticno} type="checkbox" label="Kartično plaćanje" />
              <Form.Check onChange={this.handleEsencijalni} type="checkbox" label="Esencijalni lijekovi" />
            </Form>
          </div>
          <div className="div-button" style={{ alignSelf: "center", margin: "20px" }}>
            <Button variant="secondary" className="button" onClick={this.prikazi}>
              Prikaži
            </Button>
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Šifra</th>
                <th>Naziv</th>
                <th>Količina</th>
                <th>Cijena</th>
              </tr>
            </thead>
            <tbody>{this.state.tableData.length !== 0 ? this.state.tableData.map(this.renderTableData) : null}</tbody>
          </Table>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Ukupno</td>
                <td style={{ float: "right" }}>{(Math.round(this.state.ukupno * 100) / 100).toFixed(2)} KM</td>
              </tr>
            </tbody>
          </Table>
          <Button variant="secondary" style={{ float: "right", marginTop: "20px" }} className="button" onClick={this.isprintaj}>
            Isprintaj izvještaj
          </Button>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Potvrda printanja</Modal.Title>
          </Modal.Header>
          <Modal.Body>Da li ste sigurni da želite isprintati izvještaj? </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className="modal-button" onClick={this.handleClose}>
              Ne
            </Button>
            <Button variant="secondary" className="modal-button" onClick={this.handlePrint}>
              Da
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
