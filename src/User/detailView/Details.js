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
        this.sortComment =this.sortComment.bind(this)
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
        if(this.state.isSorted == false){
            const sortedReviews= this.state.reviews.sort(function(a, b){
                return a.rating - b.rating
            })
             this.setState({
                 reviews: sortedReviews,
                 isSorted: true
             })
        }
        else{
            const sortedReviews= this.state.reviews.sort(function(a, b){
                return b.rating - a.rating
            })
             this.setState({
                 reviews: sortedReviews,
                 isSorted: false
             })
        }
      

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
            <div style={{ height: '100%', padding:'10px'}}>
                <div>
                    <img style={{ width: '100%'}} src={images} alt='pic' />
                    <li style={{ listStyleType: 'none', color: 'orange', fontSize: '1.5rem' }}><b>{this.state.resturant.name}</b></li>
                    <li style={{ listStyleType: 'none', color: 'gray' }}><FaLocationArrow color='blue' style={{marginLeft:'0px', marginRight:'10px'}} />{this.state.resturant.address}</li>
                    <li style={{ listStyleType: 'none', color: 'gray' }}><FaPhoneAlt color='red' style={{marginLeft:'0px', marginRight:'10px'}} />{this.state.resturant.contact}</li>
                    <li style={{ listStyleType: 'none', color: 'gray' }}><FaStar color='orange' style={{marginLeft:'0px', marginRight:'10px'}} />{this.state.resturant.avg.toFixed(1)}</li>
                    <div>
                        <Row className="row-col-3" style={{marginLeft:'0px', marginRight:'0px'}}>
                            <Col className="p-0 m-auto col-md-3" style={{width:'100px'}}>
                                <h4 className='h-100 m-auto'>Reviews</h4>
                            </Col>
                            <Col className="m-auto p-0">
                                <Button className='rounded p-0 d-flex justify-content-center align-items-center' style={{ width: '20px', height: '20px' }} onClick={this.sortComment}><FaSort /></Button>
                            </Col>
                            <Col className="p-0 m-auto d-flex justify-content-end">
                                <Button className='rounded p-0 d-flex justify-content-center align-items-center' style={{ width: '20px', height: '20px' }} onClick={this.popUp} ><FaPlusCircle /></Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="overflow-auto" style={{ height: '40%'}} >
                        {this.state.reviews.map((review, index) => {
                            return (<div className='border-bottom' key={'review' + index}>
                                <li style={{ listStyleType: 'none' }}><b>{review.user.first_name + ' ' + review.user.last_name}</b></li>
                                <li style={{ listStyleType: 'none' }}>
                                    <Row className="row-cols-2" style={{ margin: '0px' }}>
                                        <Col className="col-lg-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                                            <StarRatings
                                                rating={review.rating}
                                                starRatedColor="orange"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension='20px'
                                                starSpacing="2px"
                                            />
                                        </Col>
                                        <Col className="col-md-auto" style={{paddingLeft:'0px', paddingRight:'0px'}}> 
                                            <h6 style={{ marginTop: '7px' }}> 
                                                {this.dateConversion(review.date)} 
                                            </h6>
                                        </Col>
                                    </Row>
                                </li>
                                <li style={{ listStyleType: 'none' }}><label>{review.comment}</label></li>
                            </div>)
                        })}
                </div>
            </div>
        )
    }
}


export default withRouter(Details);