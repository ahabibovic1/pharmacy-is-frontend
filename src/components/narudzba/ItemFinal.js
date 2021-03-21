import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export default class ItemFinal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.proizvod,
    };
    this.RemoveItem = this.RemoveItem.bind(this);
    this.PromijeniItem = this.PromijeniItem.bind(this);
  }
  RemoveItem() {
    this.props.RemoveItem(this.props.i);
  }
  PromijeniItem(e) {
    this.setState({ item: { naziv: this.state.item.naziv, kolicina: Number(e.target.value), cijena: this.state.item.cijena } }, function () {
      this.props.PromijeniItem(this.state.item, this.props.i);
    });
  }
  componentDidMount() {
    this.props.PromijeniVrijednost();
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={9}>{this.props.proizvod.naziv}</Col>
          <Col xs={2}>
            <Form.Control style={{ float: "right" }} type="number" min="1" onChange={this.PromijeniItem} value={this.props.proizvod.kolicina} />
          </Col>
          <Col>
            <Button style={{ float: "right" }} onClick={this.RemoveItem} variant="danger">
              X
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
