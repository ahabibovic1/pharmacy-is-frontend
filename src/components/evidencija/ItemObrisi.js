import React, { Component } from "react";
import { Button, Row, Col } from "react-bootstrap";

export default class ItemObrisi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.lijek,
    };
    this.handleShow = this.handleShow.bind(this);
  }
  handleShow() {
    this.props.handleShow(this.state.item.naziv, this.props.i);
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs={9}>{this.state.item.naziv}</Col>
          <Col>
            <Button style={{ float: "right", width: "50%" }} onClick={this.handleShow} variant="secondary">
              Obriši
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
