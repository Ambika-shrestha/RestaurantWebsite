import React from 'react';
import { withRouter } from 'react-router-dom';
import './reviewpop.css';
import { Form, Button, Row, Col } from 'react-bootstrap'
import StarRatings from 'react-star-ratings';
import {DatePicker} from 'react-datepicker';



class ReviewPop extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            resturant: this.props.resturant,
            reviews: [],
            comment: '',
            dateOfVisit: null,
            startDate:new Date(),
            rating: 0
        }
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
        this.setState({
            dateOfVisit: selectedDate
        })
    }


    handleClick = () => {
        this.props.toggle();
    };

    getreviewsApi = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'token ' + localStorage.getItem('token'), }
        };
        fetch('https://andesrestaurant.herokuapp.com/api/restaurants/' + this.props.resturant.id + '/reviews', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                console.log('data', data)
                this.setState({
                    reviews: data
                })
            })
            .catch(error => {
                this.setState({
                    error: 'Unknown Error'
                })
            })
    }

    addReviewsApi = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                comment: this.state.comment,
                dateOfVisit: this.state.dateOfVisit,
            })
        };
        fetch('https://andesrestaurant.herokuapp.com/api/register', requestOptions)
            .then(response => {
                this.setState({
                    isspinning: false
                });
                if (!response.ok) {
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                localStorage.setItem('token', data['key']);
                this.setState({
                    error: ''
                })
                if (data['user']['is_superuser'] === false && data['user']['is_staff'] === false) {
                    this.props.history.push("/dashboard")
                }
            })
            .catch(error => {
                this.setState({
                    error: 'User already exist'
                })
            })
    }


    render() {
        return (
            <div className="popup  d-flex justify-content-center align-items-center rounded overflow-hidden">
                <div className='bg-white w-25 h-75 '>
                    <h3 className='mt-3 text-center'>{this.state.resturant.name}</h3>
                    <h6 className='mb-4'>{this.state.resturant.address}</h6>
                    <h5>Reviews</h5>
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
                                name='rating'
                            />
                        </Col>
                    </Row>
                    <Form>
                        <Form.Group className="mb-3 p-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                    <div>
                        <Row>
                            <Col>
                                <h5>Date of Visit</h5>
                            </Col>
                            <Col>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.didSelectDate}
                                />
                            </Col>
                        </Row>
                        <div>
                            <Button type="submit" className='mr-3' onClick={this.addReviewbtn} >Submit</Button>
                             
                            <Button className='bg-danger' onClick={this.handleClick}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ReviewPop);