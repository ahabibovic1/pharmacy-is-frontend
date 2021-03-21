import React, { Component } from "react";
import { Table, Alert, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "./Temperatura.css";
var temp = require("../../mock-data/temperatura.json");

export default class Temperatura extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datum: new Date(),
      temp: temp,
      prostorija: "Prostorija 1",
      selected: [],
      alertVisible: false,
      alertMssg: "",
    };
  }

  onChange = (e) => {
    this.setState({ prostorija: e.target.value });
  };

  prikazi = () => {
    let naziv = this.state.prostorija;
    let alertVrijeme = "";
    let result = temp.filter(function (v, i) {
      if (naziv === v.prostorija) {
        if (v.prostorija === "Prostorija 2") {
          alertVrijeme = v.vrijeme;
        }
        return v;
      }
    });
    this.setState({ selected: result });
    console.log(alertVrijeme);
    if (alertVrijeme !== "") {
      this.setState({ alertVisible: true, alertMssg: `Temperatura izmjerena u 12:00 je van opsega` });
    }
    else {
      this.setState({ alertVisible: false });
    }
  };

  renderTableData = (row, index) => {
    return (
      <React.Fragment>
        <tr key={index}>
          <td>{row.vrijeme[0]}</td>
          <td>{row.temperatura[0]}</td>
        </tr>
        <tr key={index}>
          <td>{row.vrijeme[1]}</td>
          <td>{row.temperatura[1]}</td>
        </tr>
        <tr key={index}>
          <td>{row.vrijeme[2]}</td>
          <td>{row.temperatura[2]}</td>
        </tr>
        <tr key={index}>
          <td>{row.vrijeme[3]}</td>
          <td>{row.temperatura[3]}</td>
        </tr>
      </React.Fragment>
    );
  };

  toggle = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  };

  render() {
    return (
      <div>
        <Alert style={{ margin: "20px" }} variant="danger" dismissible show={this.state.alertVisible} onClose={this.toggle}>
          {this.state.alertMssg}
        </Alert>
        <div className="div-1">
          <div className="div-2">
            <div className="div-3">
              <Form.Control as="select" onChange={this.onChange}>
                {this.state.temp.map((e) => (
                  <option key={e.prostorija} value={e.prostorija}>
                    {e.prostorija}
                  </option>
                ))}
              </Form.Control>
            </div>
            <div className="div-4">
              <DatePicker minDate={null} maxDate={new Date()} dateFormat="dd-MM-yyyy" selected={this.state.datum} onChange={(date) => this.setState({ datum: date })} />
            </div>
            <div className="div-button" style={{ alignSelf: "center", margin: "20px" }}>
              <Button variant="secondary" className="button" onClick={this.prikazi}>
                Prikaži
              </Button>
            </div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Vrijeme mjerenja</th>
                <th>Temperatura</th>
              </tr>
            </thead>
            <tbody>{this.state.selected.length !== 0 ? this.state.selected.map(this.renderTableData) : null}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}
