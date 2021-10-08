import React from 'react';
import { withRouter } from 'react-router-dom';
import images from '../../img/images.jpg';
import './detail.css';
import StarRatings from 'react-star-ratings';
import { FaLocationArrow, FaPhoneAlt, FaStar, FaPlusCircle, FaSort } from 'react-icons/fa';
import { Col, Row, Button } from 'react-bootstrap';



class Details extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            resturant: this.props.resturant,
            reviews: [],
            disabled: true,
            isSorted: false
        }
        this.dateConversion = this.dateConversion.bind(this)
        this.popUp = this.popUp.bind(this)
        this.sortComment = this.sortComment.bind(this)
    }

    componentDidMount() {
        this.reviewsApi();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.resturant !== this.props.resturant) {
            this.setState({
                resturant: this.props.resturant,
                addReview: this.props.addReview
            })
            this.reviewsApi();
        }
    }

    dateConversion = (dateUnix) => {
        const date = new Date(dateUnix * 1000);
        return date.toLocaleString()
    }

    popUp = (event) => {
        this.props.addReview(this.state.resturant)
    }

    sortComment = (event) => {

        let sortedReviews = this.state.reviews.sort((a, b) => {
            if (this.state.isSorted === false) {
                return a.rating - b.rating
            } else {
                return b.rating - a.rating
            }
        })
        this.setState({
            reviews: sortedReviews,
            isSorted: !this.state.isSorted
        })
    }

    reviewsApi = () => {
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

    render() {
        return (
            <div style={{ height: '95vh', backgroundColor:'rgba(247,247,247,1)', position: 'relative' }}>
                <div className="p-2" style={{width: '100%', height: "350px", position: 'absolute' }}>
                    <img style={{ width: '100%', height:'200px', objectFit: 'cover' }} src={"https://andesrestaurant.herokuapp.com/api" + this.state.resturant.image} alt='pic' />
                    <li style={{ listStyleType: 'none', color: 'orange', fontSize: '1.5rem' }}><b>{this.state.resturant.name}</b></li>
                    <li style={{ listStyleType: 'none', color: 'gray' }}><FaLocationArrow color='blue' style={{ marginLeft: '0px', marginRight: '10px' }} />{this.state.resturant.address}</li>
                    <li style={{ listStyleType: 'none', color: 'gray' }}><FaPhoneAlt color='red' style={{ marginLeft: '0px', marginRight: '10px' }} />{this.state.resturant.contact}</li>
                    <li style={{ listStyleType: 'none', color: 'gray' }}><FaStar color='orange' style={{ marginLeft: '0px', marginRight: '10px' }} />{this.state.resturant.avg.toFixed(1)}</li>
                    <div>
                        <Row className="row-col-3" style={{ marginLeft: '0px', marginRight: '0px' }}>
                            <Col className="p-0 m-auto col-md-3" style={{ width: '100px' }}>
                                <h4 className='h-100 m-auto'>Reviews</h4>
                            </Col>
                            <Col className="m-auto p-0">
                                <Button className='rounded p-0 d-flex justify-content-center align-items-center' style={{ width: '20px', height: '20px', backgroundColor:'orange' }} onClick={this.sortComment}><FaSort color="black" /></Button>
                            </Col>
                            <Col className="p-0 m-auto d-flex justify-content-end">
                                <Button className='rounded p-0 d-flex justify-content-center align-items-center' style={{ width: '20px', height: '20px', backgroundColor:'orange' }} onClick={this.popUp} ><FaPlusCircle color="black" /></Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="overflow-auto" style={{width: '100%', marginTop:'350px', position: 'absolute', top:'0', bottom:'0', backgroundColor:'rgba(247,247,247,1)' }} >
                    {this.state.reviews.map((review, index) => {
                        return (<div className='p-1 pe-3' key={'review' + index}>
                            <div className="bg-white rounded shadow-sm overflow-hidden p-2">
                            <li style={{ listStyleType: 'none' }}><b>{review.user.first_name + ' ' + review.user.last_name}</b></li>
                            <li style={{ listStyleType: 'none' }}>
                                <Row className="row-cols-2" style={{ margin: '0px' }}>
                                    <Col className="col-lg-4" style={{ paddingLeft: '0px', paddingRight: '0px', }}>
                                        <StarRatings
                                            rating={review.rating}
                                            starRatedColor="orange"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension='20px'
                                            starSpacing="2px"
                                        />
                                    </Col>
                                    <Col className="col-md-auto" style={{ paddingLeft: '0px', paddingRight: '0px',  height:'25px' }}>
                                        <h6 style={{ marginTop: '7px' }}>
                                            {this.dateConversion(review.date)}
                                        </h6>
                                    </Col>
                                </Row>
                            </li>
                            <li style={{ listStyleType: 'none' }}><label>{review.comment}</label></li>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        )
    }
}


export default withRouter(Details);