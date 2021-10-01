import React from 'react';
import { withRouter } from 'react-router-dom';
import images from '../img/images.jpg';
import './detail.css';
import ReactStars from "react-rating-stars-component";
import { FaLocationArrow, FaPhoneAlt, FaStar} from 'react-icons/fa';
import { Col, Row } from 'react-bootstrap';


class Details extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            datas:[],
            reviews:[]
        }
       // this.reviewsApi();
        //this.ratingChanged = this.ratingChanged.bind(this);
    }

    ratingChanged = (event) => {
        alert('hello')
    }

    reviewsApi =() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'token ' + localStorage.getItem('token'), }
        };
        fetch('https://andesrestaurant.herokuapp.com/api/restaurants/reviews', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                console.log('data',data)
                this.setState({
                    reviews:data
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
            <div> 
               <div>
                    <img style={{ width: '100%', height: '200px', paddingTop:'15px'}} src={images} alt='pic' />
                    <li style={{  listStyleType: 'none', color: 'orange',fontSize:'1.5rem' }}><b>Momo</b></li>
                    <li style={{  listStyleType: 'none', color: 'gray' }}><FaLocationArrow color='blue' className="mr-2"/>Paris</li>
                    <li style={{  listStyleType: 'none', color: 'gray' }}><FaPhoneAlt color='red' className="mr-2"/>0123456789</li>
                    <li style={{ listStyleType: 'none', color: 'gray' }}><FaStar color='orange' className="mr-2"/>5</li> 
                    <div>
                       <h4 className='pt-2'>Reviews</h4>
                       <li style={{ listStyleType: 'none'}}>Ambika Shrestha</li>
                       <li style={{ listStyleType: 'none'}}>
                       <Row style={{margin:'0px'}}>
                           <Col md={3.5} >
                           <ReactStars
                            count={5}
                            onChange={this.ratingChanged}
                            size={24}
                            activeColor="#ffd700"/>
                          </Col>
                           <Col md={8} > <h6 style={{marginTop:'10px'}}> 2027-12-5 </h6></Col>
                       </Row></li>
                       <li style={{listStyleType: 'none'}}><label>verry good</label></li>   
                   </div>
                    {/* {this.state.reviews.map(reviews => (<div>
                       <h4 className='pt-2'>Reviews</h4>
                       <li style={{ paddingLeft: '10px', listStyleType: 'none', color: 'orange' }}>{reviews.name}</li>
                        <li style={{ paddingLeft: '10px', listStyleType: 'none', color: 'gray' }}> <ReactStars
                            count={5}
                            onChange={this.ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />{reviews.address}</li>
                        <textarea disabled></textarea>
                   </div>
                    ))}  */}
                </div>      
            </div>
        )
    }
}


export default withRouter(Details);