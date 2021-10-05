import React from 'react';
import { withRouter } from 'react-router-dom';
import burger from '../../img/burger.jpg';
import { Button, Row } from 'react-bootstrap';
import './gallary.css';
import { height } from 'dom-helpers';


class Gallary extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            resturants: [],
            mainResturantList: [],
            error: ''
        }
    }

    componentDidMount() {
        this.onSubmit = this.onSubmit.bind(this);
        this.gallaryApi()
    }

    dimensional = (data) => {
        let temparr = []
        for (let i = 0; i < data.length; i += 3) {
            let subarr = []
            for (let j = i; j < i + 3 && j < data.length; j++) {
                subarr.push(data[j])
            }
            temparr.push(subarr)
        }
        return temparr
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
                let resturants = this.dimensional(data)
                this.setState({
                    resturants: resturants,
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
                {/* {this.state.resturants.map((reseturants, index) => {
                    return (<div className="row"
                     key={'row' + index}>
                        {reseturants.map((resturant, index) => {
                            return (<div className="column shadow-sm bg-white rounded" key={'column' + index} >
                                <div className="buttonPlace">
                                    <div className="imgPlace">
                                        <img style={{ width: '100%', height: '160px' }} src={burger} alt='pic' />
                                        <label>{resturant.avg.toFixed(1)}</label>
                                    </div>
                                    <li style={{ paddingLeft: '10px', listStyleType: 'none', marginTop: '5px', marginBottom: '3px' }}><b>{resturant.name}</b></li>
                                    <li style={{ paddingLeft: '10px', listStyleType: 'none', color: 'gray' }}>{resturant.address}</li>
                                    <Button className='btn' onClick={this.onSubmit} id={resturant.id}></Button>
                                </div>
                            </div>)
                        })
                        }
                    </div>)
                })} */}

                <div className="row p-0 m-0">
                    {
                        this.state.mainResturantList.map((resturant, index) => {
                            return (
                                <div className="p-2" style={{width:'33.3333%'}} key={'column' + index} >
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