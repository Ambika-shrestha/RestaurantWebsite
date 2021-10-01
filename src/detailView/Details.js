import React from 'react';
import { withRouter } from 'react-router-dom';
import images from '../img/images.jpg';
import './detail.css';
import { FaLocationArrow, FaPhoneAlt, FaStar} from 'react-icons/fa';


class Details extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            datas:[]
        }
        this.detailsApi()
    }

    detailsApi = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'token ' + localStorage.getItem('token'), }
        };
        fetch('https://andesrestaurant.herokuapp.com/api/restaurants', requestOptions)
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
                   datas:data
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
                {this.state.datas.map(datas => (<div>
                    <img style={{ width: '100%', height: '200px', paddingTop:'15px'}} src={images} alt='pic' />
                    <i class="fas fa-band-aid"></i> 
                    <li style={{ paddingLeft: '10px', listStyleType: 'none', color: 'orange' }}><b>{datas.name}</b></li>
                    <li style={{ paddingLeft: '10px', listStyleType: 'none', color: 'gray' }}><FaLocationArrow color='black' className="mr-2"/>{datas.address}</li>
                    <li style={{ paddingLeft: '10px', listStyleType: 'none', color: 'gray' }}><FaPhoneAlt color='black' className="mr-2"/>{datas.contact}</li>
                    <li style={{ paddingLeft: '10px', listStyleType: 'none', color: 'gray' }}><FaStar color='yellow' className="mr-2"/>{datas.avg.toFixed(1)}</li> 
                    <div>
                       <h4 className='p-2'>Reviews</h4>
                       <p>verry good</p>
                   </div> 
                </div>
                ))}        
            </div>
        )
    }
}


export default withRouter(Details);