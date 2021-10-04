import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Details from '../detailView/Details';
import Gallary from '../gallaryView/Gallary';
import ReviewPop from '../reviewPopUp/ReviewPop';



class Dashboard extends React.Component {

    constructor(props){
        super(props)
        this.state={
            details: null,
            resturant: null,
            modalOpened: false
        }
        this.gridSelect= this.gridSelect.bind(this);
        this.addReview= this.addReview.bind(this);
    }
   
    gridSelect(resturant){
        this.setState({
            details: resturant
        })
    }

    togglePop = () => {
        this.setState({
            modalOpened: !this.state.modalOpened
        });
       };

    addReview(resturant){
       console.log('resturant',resturant)
       this.setState({
        modalOpened:true
       })

    }

    render() {
        return (
            <div className={`vh-100 h-100`} style={{backgroundColor:'rgba(247,247,247,1)', position:'relative'}}>
                <div style={{height:'50px',backgroundColor:'white',marginBottom:'5px'}}>
                    <h4 style={{textAlign:'center', color:'orange', paddingTop:'10px'}}>Resturant Review</h4>
                </div>
            <Row>
                <Col md={8} style={{backgroundColor:'rgba(247,247,247,1)', height:'90vh', overflow:'auto'}}>
                    <Gallary select={this.gridSelect}/>
                </Col>
                {this.state.details !== null  && <Col md={4} style={{backgroundColor:'white'}}>
                    <Details resturant={this.state.details} addReview={this.addReview}/>
                </Col>}       
            </Row>
               {this.state.modalOpened && <ReviewPop toggle={this.togglePop} resturant={this.state.details}/>}
        </div>
        )
    }
}

export default Dashboard;