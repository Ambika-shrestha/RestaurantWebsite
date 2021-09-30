import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Details from '../detailView/Details';
import Gallary from '../gallaryView/Gallary';



class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`vh-100 h-100`} style={{backgroundColor:'rgba(247,247,247,1)'}}>
                <div style={{height:'50px',backgroundColor:'white',marginBottom:'5px'}}>
                    <h4 style={{textAlign:'center', color:'orange', paddingTop:'10px'}}>Resturant Review</h4>
                </div>
            <Row>
                <Col md={8} style={{backgroundColor:'rgba(247,247,247,1)'}}>
                    <Gallary/>
                </Col>
                <Col md={4} style={{backgroundColor:'white'}}>
                    <Details/>
                </Col>
            </Row>
        </div>
        )
    }
}

export default Dashboard;