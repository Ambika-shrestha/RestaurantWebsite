import React from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Col, InputGroup, Spinner, Button, Row } from 'react-bootstrap'
import StarRatings from 'react-star-ratings';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './ReviewsEdit.css'


class ReviewsEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //objects, proporties, variables
            user: props.reviews.user,//returning {}
            rating: props.reviews.rating,
            comment: props.reviews.comment,
            resturant: {},
            dateOfVisit: this.dateConversion(props.reviews.date),
            error: '',
            isspinning: false,
            userError: '',
            ratingError: '',
            commentError: '',
            dateOfVisitError: '',
            resturantError: '',
            getUserList: [],
            getResturantList: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateReviewBtn = this.updateReviewBtn.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.getResturantListApi()
    }

    updateReviewBtn = (event) => {
        console.log('update')
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log('wrong validaion')
            this.setState({
                error: 'Please enter valid inputs'
            })
            event.stopPropagation();
            return
        }
        if (this.validation()) {
            this.reviewEditApi(this.props.reviews.id)
        }
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

    dateConversion = (dateUnix) => {
        const date = new Date(dateUnix * 1000);
        return date
    }

    handleClick = () => {
        this.props.toggleEditReviews()
    };

    validation = () => {
        if (this.state.user === '' && this.state.resturant === '' && this.state.comment === ''
            && this.state.dateOfVisit === '' && this.state.rating === '') {
            this.setState({
                userError: 'Please enter user',
                resturantError: 'Please enter resturant',
                commentError: 'Please enter comment',
                dateOfVisitError: 'Please enter date of visit',
                ratingError: 'Please rate'
            })
            return false;
        }
        if (this.state.user === '') {
            this.setState({
                userError: "Please enter user"
            })
            return false;
        }
        if (this.state.resturant === '') {
            this.setState({
                resturantError: "Please enter resturant"
            })
            return false;
        }
        if (this.state.comment === '') {
            this.setState({
                commentError: "Please enter comment"
            })
            return false;
        }
        if (this.state.dateOfVisit === '') {
            this.setState({
                dateOfVisitError: "Please enter date"
            })
            return false;
        }
        if (!this.state.rating) {
            this.setState({
                ratingError: "Please enter rating"
            })
            return false;
        }
        return true
    }

    getResturantListApi = () => {
        fetch("https://andesrestaurant.herokuapp.com/api/restaurants", {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(json => { throw json.detail; });
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                const resturant = this.filterResturant(data)
                this.setState({
                    resturant : resturant
                })
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    filterResturant = (resturantList) =>{
        for(let dictonary of resturantList){
            if( dictonary.id  === this.props.reviews.restaurant){
                return dictonary
            }          
        }
    }

    reviewEditApi = (id) => {
        this.setState({
            isspinning: true
        });
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                rating: this.state.rating,
                comment: this.state.comment,
                date: Math.round((this.state.dateOfVisit).getTime() / 1000)
            })
        };
        fetch('https://andesrestaurant.herokuapp.com/api/reviews/' + id, requestOptions)
            .then(response => {
                this.setState({
                    isspinning: false
                });
                if (!response.ok) {
                    return response.json().then(json => { throw json.detail; });
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
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

    render() {
        return (
            <div className="popup d-flex justify-content-center align-items-center rounded overflow-hidden">
                <div className={`formCardEditReviews mx-auto bg-light p-3 rounded shadow`}>
                    <Form>
                        {this.state.error !== '' ? <h3 className="text-center" style={{ color: 'red' }}>{this.state.error}</h3> : undefined}
                        <h4 className="text-center">update Reviews</h4>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <select className="form-select"
                                    name="user"
                                    onClick={e => this.userSelectClicked(e)}
                                    onChange={this.handleChange}
                                    disabled>
                                    <option value={this.state.user.id}>{this.state.user.first_name} {this.state.user.last_name}</option>
                                </select>
                                <Form.Control.Feedback type="invalid" style={{ display: this.state.userError === '' ? 'none' : 'block' }}>
                                    {this.state.userError}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <select className="form-select"
                                    name="resturant"
                                    onClick={e => this.resturantSelectClicked(e)}
                                    onChange={this.handleChange}
                                    disabled>
                                     <option value={this.state.resturant.id}>{this.state.resturant.name}</option>
                                </select>
                                <Form.Control.Feedback type="invalid" style={{ display: this.state.resturantError === '' ? 'none' : 'block' }}>
                                    {this.state.resturantError}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">
                                    <Form.Control as="textarea" className='input' name="comment" placeholder="Comment" required autoFocus
                                        value={this.state.comment}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.commentError === '' ? 'none' : 'block' }}>
                                        {this.state.commentError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        {/* <div className='d-flex justify-content-center align-items-center'> */}
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

                        {/* </div> */}
                        <Row className='row justify-content-center mb-5' >
                            <Col md={3.5} >
                                <StarRatings
                                    rating={this.state.rating}
                                    changeRating={this.changeRating}
                                    starRatedColor="orange"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension='50px'
                                    starSpacing="2px"
                                    value={this.state.rating}
                                />
                            </Col>
                        </Row>
                        <div className='d-flex justify-content-center'>
                            {this.state.isspinning ? <Spinner style={{ width: '3rem', height: '3rem' }} animation="border" variant="primary" /> :
                                <Button className={`w-50 gradient border border-white`} onClick={this.updateReviewBtn} type="submit">
                                    Update
                                </Button>}
                            <Button className='bg-danger border border-white' onClick={this.handleClick}>Close</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}


export default withRouter(ReviewsEdit)