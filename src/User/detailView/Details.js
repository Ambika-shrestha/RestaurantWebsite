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
            disabled: true
        }
        this.dateConversion = this.dateConversion.bind(this)
        this.popUp = this.popUp.bind(this)
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
            <div style={{ height: '100%', display:'table', padding:'10px'}}>
                <div style={{ height: '64%',display: 'table-row'}}>
                    <img style={{ width: '407px'}} src={images} alt='pic' />
                    <li style={{ listStyleType: 'none', color: 'orange', fontSize: '1.5rem' }}><b>{this.state.resturant.name}</b></li>
                    <li style={{ listStyleType: 'none', color: 'gray' }}><FaLocationArrow color='blue' className="mr-2" />{this.state.resturant.address}</li>
                    <li style={{ listStyleType: 'none', color: 'gray' }}><FaPhoneAlt color='red' className="mr-2" />{this.state.resturant.contact}</li>
                    <li style={{ listStyleType: 'none', color: 'gray' }}><FaStar color='orange' className="mr-2" />{this.state.resturant.avg.toFixed(1)}</li>
                    <div>
                        <Row className="mt-1 mr-0 ml-0">
                            <Col className="p-0 m-auto col-md-3" style={{width:'100px'}}>
                                <h4 className='h-100 m-auto'>Reviews</h4>
                            </Col>
                            <Col className="m-auto p-0">
                                <Button className='rounded p-0 d-flex justify-content-center align-items-center' style={{ width: '20px', height: '20px' }} ><FaSort /></Button>
                            </Col>
                            <Col className="p-0 m-auto d-flex justify-content-end">
                                <Button className='rounded p-0 d-flex justify-content-center align-items-center' style={{ width: '20px', height: '20px' }} onClick={this.popUp} ><FaPlusCircle /></Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="overflow-auto" style={{ height: '200px'}} >
                        {this.state.reviews.map((review, index) => {
                            return (<div className='border-bottom' key={'review' + index}>
                                <li style={{ listStyleType: 'none' }}><b>{review.user.first_name + ' ' + review.user.last_name}</b></li>
                                <li style={{ listStyleType: 'none' }}>
                                    <Row style={{ margin: '0px' }}>
                                        <Col md={3.5} >
                                            <StarRatings
                                                rating={review.rating}
                                                starRatedColor="orange"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension='20px'
                                                starSpacing="2px"
                                            />
                                        </Col>
                                        <Col md={8} > <h6 style={{ marginTop: '7px' }}> {this.dateConversion(review.date)} </h6></Col>
                                    </Row></li>
                                <li style={{ listStyleType: 'none' }}><label>{review.comment}</label></li>
                            </div>)
                        })}
                </div>
            </div>
        )
    }
}


export default withRouter(Details);