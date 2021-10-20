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
            this.addReviewApi();
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
            dateOfVisit: selectedDate,
        })
    }

    submitButtonClick = () => {
        this.addReviewApi();
    }

    handleClick = () => {
        this.props.toggle();
    };

    addReviewApi = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'token ' + localStorage.getItem('token') },
            body: JSON.stringify({
                user: parseInt(localStorage.getItem('user')),
                rating: this.state.rating,
                date: (this.state.dateOfVisit).getTime() / 1000,
                comment: this.state.comment,
                restaurant: this.state.resturant.id
            })
        };
        fetch('https://andesrestaurant.herokuapp.com/api/reviews', requestOptions)
            .then(response => {
                console.log('response', response, requestOptions)
                if (!response.ok) {
                    return response.json().then(json => { throw json.detail; });
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                console.log('data review', data)
                this.setState({
                    error: ''
                })
                window.location.reload(true);
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            [name + 'Error']: ''
        });
    }
    render() {
        return (
            <div className="popup  d-flex justify-content-center align-items-center rounded overflow-hidden">
                <div className='bg-white m-3 p-3'>
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
                                value={this.state.rating}
                            />
                        </Col>
                    </Row>
                    <Form className="d-flex justify-content-center mb-4 mt-4">
                        <Form.Group style={{ width: '300px' }} controlId="exampleForm.ControlTextarea1">
                            <h5><b>Comments</b></h5>
                            <Form.Control className="w-100" as="textarea" rows={3} value={this.state.comment}
                                name='comment'
                                onChange={this.handleChange} />
                        </Form.Group>
                    </Form>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Row className="mb-4" style={{ width: '330px' }}>
                            <Col className='d-flex justify-content-center align-items-center'>
                                <label className='mt-1' style={{ width: '200px' }}><b>Date of Visit</b></label>
                                <DatePicker
                                    className='d-flex justify-content-center align-items-center w-100'
                                    selected={this.state.dateOfVisit}
                                    maxDate={new Date()}
                                    onChange={date => this.didSelectDate(date)}
                                    dateFormat="dd/MMM/yyyy"
                                />
                            </Col>
                        </Row>

                    </div>
                    <div className='mb-2'>
                        <Button type="submit" className='mx-3' onClick={this.submitButtonClick} >Submit</Button>
                        <Button className='bg-danger border border-white' onClick={this.handleClick}>Close</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewPop;