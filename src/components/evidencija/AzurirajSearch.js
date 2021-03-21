import React, { Component } from 'react'
import { ListGroup, Card, Form, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import PaginationList from 'react-pagination-list';
import ItemAzuriraj from './ItemAzuriraj'
const mockLijekovi = require("../../mock-data/esencijalni_test.json");
const mockKategorije = require("../../mock-data/kategorije.json");

export default class AzurirajSearch extends Component {
    constructor(props) {
        super(props);
        this.state={
            lijekovi : mockLijekovi,
            SearchTerm: '',
            filtered_lijekovi: mockLijekovi,
            kategorije: mockKategorije,
            filtered_by_kategorija: mockLijekovi,
            kategorija :"", 
            esencijalni: false,
            filtered_by_esencijalni: mockLijekovi
        }
        this.editSearchTerm=this.editSearchTerm.bind(this);
        this.changeKategorija=this.changeKategorija.bind(this);
        this.handleOdabir=this.handleOdabir.bind(this);
    }
    editSearchTerm(e){
        this.setState({SearchTerm: e.target.value},function(){ this.filterLijekovi()})
    }
    filterLijekovi(){
        var lijekovi = this.state.lijekovi.filter(lijek => lijek.naziv.toLowerCase().includes(this.state.SearchTerm.toLowerCase()))
        if(this.state.kategorija!=="")
            lijekovi = lijekovi.filter(lijek => lijek.kategorija ===this.state.kategorija)
        if(this.state.esencijalni===true)
            lijekovi=lijekovi.filter(lijek=> lijek.esencijalni===true)
        this.setState({filtered_lijekovi:lijekovi})
    }
    changeKategorija(e){
        this.setState({kategorija: e.target.value},function(){this.filterLijekovi()})
    }
    handleOdabir(){
        this.props.handleOdabir()
    }
    handleChangeEsencijalni=(e)=> {
        this.setState({ esencijalni: e.target.checked }, this.filterLijekovi);
      }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        
                    </Row>
                    <Row >
                        <Col>
                        <Form.Label>Pretraga</Form.Label>
                        <input className="form-control search"  type="text"  onChange={this.editSearchTerm} placeholder='Pretraži proizvode' />
                        </Col>
                        <Col>
                        <Form.Label>Odabir kategorije</Form.Label>
                            <Form.Control as="select" onChange={this.changeKategorija}>
                                <option value="" key={-1}> Sve kategorije</option>
                                {this.state.kategorije.map(kategorija=>(
                                    <option  key={kategorija.id} value={kategorija.naziv} > {kategorija.naziv} </option>

                                ))}
                            </Form.Control>
                        
                        </Col>
                        <Col style={{paddingTop:"3%"}}  xs="auto">
                        <Form.Check type="checkbox" onChange={this.handleChangeEsencijalni} checked={this.state.esencijalni} label="Esencijalni lijekovi" />
                        </Col>
                    </Row>
                </Container>
                <ListGroup style ={{"overflow": "auto", height:"600px", "overflow-x": "hidden"}}> 
                    <Container className="search_red">
                        {this.state.filtered_lijekovi.map((lijek, i)=>(
                            <ListGroup.Item key={lijek.naziv}>
                                <ItemAzuriraj handleOdabir={()=>this.props.handleOdabir(lijek)} i={i} lijek={lijek} />
                            </ListGroup.Item>
                        ))}
                    </Container>
                </ListGroup>
                <ListGroup>
                </ListGroup>
            </div>
        )
    }
}
