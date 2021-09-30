import React from 'react';
import { withRouter } from 'react-router-dom';
import burger from '../img/burger.jpg';
import './gallary.css';


class Gallary extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            resturants: [],
        }
        this.gallaryApi()
    }

    dimensional = (data) => {
        let temparr = []
        for (let i = 0; i < data.length; i += 3) {
            let subarr = []
            for (let j = i; j < i + 3 && j<data.length; j++) {
                subarr.push(data[j])
            }
            temparr.push(subarr)
        }
        return temparr
    }

    gallaryApi = () => {
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
                let resturants = this.dimensional(data)
                console.log('ff',resturants)
                this.setState({
                    resturants: resturants
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
            <div id="showgrid">
                {this.state.resturants.map((reseturants, index) => {
                    return (<div class="row">
                        {reseturants.map((resturant, index) => {
                            return (<div class="column shadow-sm bg-white rounded">
                                <div id="imgPlace">
                                    <img style={{ width: '100%', height: '160px' }} src={burger} alt='pic' />
                                    <label>{resturant.avg.toFixed(1)}</label>
                                </div>
                                <li style={{ paddingLeft: '10px', listStyleType: 'none', marginTop: '5px', marginBottom: '3px' }}><b>{resturant.name}</b></li>
                                <li style={{ paddingLeft: '10px', listStyleType: 'none', color: 'gray' }}>{resturant.address}</li>
                            </div>)
                        })
                        }
                    </div>)
                })}
            </div>
        )
    }
}


export default withRouter(Gallary);