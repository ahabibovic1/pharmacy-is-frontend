import React, { Component } from 'react'
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state={
            item:{
                id:1,
                naziv:this.props.naziv,
                kolicina:this.props.kolicina,
                cijena:this.props.cijena
            }
        }
        this.DodajItem= this.DodajItem.bind(this)
        this.changeKolicina=this.changeKolicina.bind(this)
        
      }
    DodajItem(){
        this.props.DodajItem(this.state.item)
        this.setState({item:{naziv:this.state.item.naziv,kolicina:1, cijena:this.state.item.cijena}})
    }
    changeKolicina(e){
        this.setState({item:{naziv:this.state.item.naziv,kolicina:Number(e.target.value), cijena:this.state.item.cijena}})
    }
    render() {
        return (
                <div>
                   
                <Row>
                    <Col xs={8}>
                    {this.props.naziv}
                    </Col>
                    <Col xs={2}>
                    <Form.Control type="number" min='1'  onChange={this.changeKolicina} value={this.state.item.kolicina}/>
                    </Col>
                    <Col >
                    <Button variant="secondary" type="button" onClick={this.DodajItem} style={{ float:"right" }}>  Dodaj</Button>
                    </Col>
                 </Row>
                 </div>
            
        )
    }
}
