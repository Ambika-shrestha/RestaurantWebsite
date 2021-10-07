import React from 'react';
import { withRouter } from 'react-router-dom';
import burger from '../../img/burger.jpg';
import { Button } from 'react-bootstrap';
import './gallary.css';


class Gallary extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mainResturantList: [],
            error: ''
        }
    }

    componentDidMount() {
        this.onSubmit = this.onSubmit.bind(this);
        this.gallaryApi()
    }

    onSubmit = (event) => {
        //event.stopPropogation()
        const target = event.target;
        const resturant = this.state.mainResturantList.filter(dict => parseInt(dict.id) === parseInt(target.id))
        if (resturant.length > 0) {
            this.props.select(resturant[0])
        }
        event.preventDefault()
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
                this.props.select(data[0])
                this.setState({
                    mainResturantList: data
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
                <div className="row p-0 m-0 row-cols-3">
                    {
                        this.state.mainResturantList.map((resturant, index) => {
                            return (
                                <div className="p-2" key={'column' + index} >
                                    <div className="buttonPlace bg-white rounded shadow-sm overflow-hidden">
                                        <div className="imgPlace">
                                            <img style={{ width: '100%' }} src={burger} alt='pic' />
                                            <label>{resturant.avg.toFixed(1)}</label>
                                        </div>
                                        <li style={{ paddingLeft: '10px', listStyleType: 'none' }}><b>{resturant.name}</b></li>
                                        <li style={{ paddingLeft: '10px', listStyleType: 'none', color: 'gray' }}>{resturant.address}</li>
                                        <Button className='btn' onClick={this.onSubmit} id={resturant.id}></Button> 
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> 
            </div>
        )
    }
}


export default withRouter(Gallary);