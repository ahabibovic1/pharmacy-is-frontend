import React, { Component } from "react";
import AzurirajItem from "./AzurirajItem";
import AzurirajSearch from "./AzurirajSearch";
export default class Azuriraj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: true,
      odabraniLijek: { naziv: "aaaa" },
    };
    this.handleOdabir = this.handleOdabir.bind(this);
    this.nazad = this.nazad.bind(this);
  }
  handleOdabir(odabraniLijek) {
    this.setState({ search: !this.state.search, odabraniLijek: odabraniLijek });
  }
  nazad() {
    this.setState({ search: !this.state.search });
  }
  render() {
    const search = this.state.search;
    return <div>{search ? <AzurirajSearch handleOdabir={this.handleOdabir} /> : <AzurirajItem nazad={this.nazad} lijek={this.state.odabraniLijek} />}</div>;
  }
}
