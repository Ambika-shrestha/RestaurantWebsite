import React from 'react';
import './reviewpop.css';
import { Form, Button, Row, Col } from 'react-bootstrap'
import StarRatings from 'react-star-ratings';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class ReviewPop extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            resturant: this.props.resturant,
            reviews: [],
            comment: '',
            dateOfVisit: new Date(),
            rating: 0
        }

        this.submitButtonClick = this.submitButtonClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.resturant !== this.props.resturant) {
            this.setState({
                resturant: this.props.resturant,
            })
            this.getreviewsApi();
        }
    }

    changeRating = (newratings) => {
        this.setState({
            rating: newratings
        });
    }

    didSelectDate = (selectedDate) => {
        console.log(selectedDate)
        this.setState({
            dateOfVisit: selectedDate
        })
    }

    submitButtonClick = (event) => {
        console.log("Submit Button Click");
    }

    handleClick = () => {
        this.props.toggle();
    };

    render() {
        return (
            <div className="popup  d-flex justify-content-center align-items-center rounded overflow-hidden">
                <div className='bg-white w-75 h-75 '>
                    <h3 className='mt-3 text-center'>{this.state.resturant.name}</h3>
                    <h6 className='mb-4'>{this.state.resturant.address}</h6>
                    <h5><b>Reviews</b></h5>
                    <Row className='row justify-content-center'>
                        <Col md={3.5} >
                            <StarRatings
                                rating={this.state.rating}
                                changeRating={this.changeRating}
                                starRatedColor="orange"
                                numberOfStars={5}
                                name='rating'
                                starDimension='27px'
                                starSpacing="2px"
                            />
                        </Col>
                    </Row>
                    <Form className="d-flex justify-content-center w-100 mb-4 mt-4">
                        <Form.Group className="w-75" controlId="exampleForm.ControlTextarea1">
                            <h5><b>Comments</b></h5>
                            <Form.Control className="w-100" as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                    <div>
                        <Row className="mb-4">
                            <Col className='d-flex justify-content-end'>
                                <h5 className='mt-1'><b>Date of Visit</b></h5>
                            </Col>
                            <Col className='d-flex justify-content-start'>
                                <DatePicker
                                    className='d-flex justify-content-start'
                                    selected={this.state.dateOfVisit}
                                    maxDate={new Date()}
                                    onChange={date => this.didSelectDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </Col>
                        </Row>
                        <div>
                            <Button type="submit" className='mr-3 w-25' onClick={this.submitButtonClick} >Submit</Button>
                            <Button className='bg-danger w-25' onClick={this.handleClick}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewPop;