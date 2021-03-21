import React, { Component } from 'react'
import { Button, Row, Col } from 'react-bootstrap';

export default class ItemAzuriraj extends Component {
    constructor(props) {
        super(props);
        this.state={
            item:this.props.lijek
        }
        this.handleAzuriraj= this.handleAzuriraj.bind(this)
    }
    handleAzuriraj(){
        this.props.handleOdabir()
    }
    render() {
        return (
            <div>
               <Row>
                    <Col xs={9}>
                        {this.state.item.naziv}
                    </Col>
                    <Col >
                        <Button style={{ float:"right", width:"50%" }} onClick={this.handleAzuriraj} variant="secondary">Ažuriraj</Button>
                    </Col>
                </Row> 
            </div>
        )
    }
}
