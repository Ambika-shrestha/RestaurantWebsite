import React from 'react';
import { withRouter } from 'react-router-dom';
import burger from '../img/burger.jpg';
import { Button } from 'react-bootstrap';
import './gallary.css';


class Gallary extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            resturants: [],
            error:''
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
            for (let j = i; j < i + 3 && j<data.length; j++) {
                subarr.push(data[j])
            }
            temparr.push(subarr)
        }
        return temparr
    }

    onSubmit = (event) => {
        //event.stopPropogation()
       const target = event.target;
       console.log('event clicked', target)
       this.props.select(target.id)

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
            <div className ="showgrid">
                {this.state.resturants.map((reseturants, index) => {
                    return (<div className="row" key={'row'+ index}>
                        {reseturants.map((resturant, index) => {
                            return (<div className="column shadow-sm bg-white rounded"  key={'column'+ index} >
                                <div className="buttonPlace">
                                <div className="imgPlace">
                                    <img style={{ width: '100%', height: '160px' }} src={burger} alt='pic'/>
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
                })}
            </div>
        )
    }
}


export default withRouter(Gallary);