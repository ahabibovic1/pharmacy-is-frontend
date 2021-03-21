import React, { Component } from "react";
import ItemFinal from "./ItemFinal.js";
import { ListGroup, Container, Card, Button, Modal, Alert } from "react-bootstrap";
import { getRandomInt } from "../../helpers/RandomInteger";
export default class FinalizirajNarudzbu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apoteka: "Apoteka Socijalno",
      datum: new Date().toLocaleString(),
      brojNarudzbe: getRandomInt(),
      vrijednostNarudzbe: "99,00 KM",
      show: false,
      alertVisible: false,
      showOtkaz: false,
      alertMssg: "",
    };
    this.PromijeniItem = this.PromijeniItem.bind(this);
    this.PromijeniVrijednost = this.PromijeniVrijednost.bind(this);
    this.OtkaziNarudzbu = this.OtkaziNarudzbu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.kreirajNarudzbu = this.kreirajNarudzbu.bind(this);
  }
  PromijeniItem(item, i) {
    var narudzba1 = this.props.narudzba;
    console.log(narudzba1);
    narudzba1[i] = item;
    this.props.PromijeniNarudzbu(narudzba1);
  }
  PromijeniVrijednost() {
    this.props.PromijeniVrijednost();
  }
  OtkaziNarudzbu() {
    this.props.PonistiNarudzbu();
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleCloseOtkaz = () => {
    this.setState({ showOtkaz: false });
  };

  handleShow() {
    this.setState({ show: true });
  }
  handleShowOtkaz = () => {
    this.setState({ showOtkaz: true });
  };
  kreirajNarudzbu() {
    this.setState({ show: false, alertVisible: true, alertMssg: "Narudžba je uspješno izvršena" }, () => {
      window.setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
    });
    this.OtkaziNarudzbu();
  }

  OtkaziNarudzbuModal = () => {
    this.handleCloseOtkaz();
    this.setState({ show: false, alertVisible: true, alertMssg: "Narudžba je uspješno otkazana" }, () => {
      window.setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
    });
    this.OtkaziNarudzbu();
  };
  toggle = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  };
  render() {
    return (
      <div>
        <Alert variant="success" dismissible show={this.state.alertVisible} onClose={this.toggle}>
          {this.state.alertMssg}
        </Alert>
        <Container>
        
        <div className="info_nar">
          <Card style={{ width: "30%", height: "100%", marginRight: "10px" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>{this.state.apoteka}</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card style={{ width: "30%", height: "100%" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>Datum: {this.state.datum}</ListGroup.Item>
              <ListGroup.Item>Broj narudžbe: {this.state.brojNarudzbe}</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card style={{ width: "30%", height: "100%" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>Vrijednost narudžbe</ListGroup.Item>
              <ListGroup.Item style={{ fontSize: "60px" }}>{(Math.round(this.props.vrijednost * 100) / 100).toFixed(2)} KM</ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
        <hr />
        <ListGroup className="search_red" style ={{"overflow": "auto", "max-height":"500px", "overflow-x": "hidden"}}>
          <Container>
            {this.props.narudzba.map((proizvod, i) => (
              <ListGroup.Item key={proizvod.id}>
                <ItemFinal i={i} PromijeniVrijednost={this.PromijeniVrijednost} proizvod={proizvod} PromijeniItem={this.PromijeniItem} RemoveItem={this.props.RemoveItem} />
              </ListGroup.Item>
            ))}
          </Container>
        </ListGroup>
        </Container>
        <Container>
          <Button variant="secondary" onClick={this.handleShow} type="button" className="button">
            Potvrdi narudžbu
          </Button>
          <Button variant="danger" onClick={this.handleShowOtkaz} type="button" className="button">
            Otkaži narudžbu
          </Button>
        </Container>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Potvrda narudžbe</Modal.Title>
          </Modal.Header>
          <Modal.Body>Da li želite poslati narudžbu?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose} className="modal-button">
              Ne
            </Button>
            <Button variant="secondary" onClick={this.kreirajNarudzbu} className="modal-button">
              Da
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showOtkaz} onHide={this.handleCloseOtkaz}>
          <Modal.Header closeButton>
            <Modal.Title>Otkazivanje narudžbe</Modal.Title>
          </Modal.Header>
          <Modal.Body>Da li želite otkazati narudžbu?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleCloseOtkaz} className="modal-button">
              Ne
            </Button>
            <Button variant="secondary" onClick={this.OtkaziNarudzbuModal} className="modal-button">
              Da
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
