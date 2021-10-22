import React from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa';
import Button from '@restart/ui/esm/Button'



class ResturantList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            resturantList: [],
            name: '',
            address: '',
            contact: '',
            image: '',
            error: '',
            isspinning: false,
            nameError: '',
            addressError: '',
            contactError: '',
            imageError: ''
        }
    }

    componentDidMount() {
        this.deleteBtnClicked = this.deleteBtnClicked.bind(this)
        this.editBtnClicked = this.editBtnClicked.bind(this)
        this.resturantListApi()
    }

    deleteBtnClicked = (id) => {
        console.log('id', id)
        this.resturantDeleteApi(id)
    }

    editBtnClicked = (resturant) => {
        console.log(this.props.toggleEditResturant)
        this.props.toggleEditResturant(resturant)
    }

    resturantListApi = () => {
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
                this.setState({
                    resturantList: data
                })
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    resturantDeleteApi = (id) => {
        fetch("https://andesrestaurant.herokuapp.com/api/restaurants/" + id, {
            method: 'DELETE',
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
                console.log('message', data.detail)
                this.resturantListApi()
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    render() {
        return (
            <div className='w-100 p-5' style={{ height: '100%' }}>
                <div>
                    <table className="table w-100 mb-0">
                        <thead>
                            <tr style={{ height: '30px' }}>
                                <th style={{ minWidth: '30px', width: '10%' }}></th>
                                <th style={{ minWidth: '80px', width: '15%' }}>IMAGE</th>
                                <th style={{ minWidth: '80px', width: '20%' }}>NAME</th>
                                <th style={{ minWidth: '80px', width: '25%' }}>ADDRESS</th>
                                <th style={{ minWidth: '80px', width: '20%' }}>CONTACT</th>
                                <th style={{ minWidth: '80px', width: '10%' }}></th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className='w-100 overflow-scroll example' style={{ height: '100%' }}>
                    <table className="table w-100 table-borderless">
                        <tbody>
                            {this.state.resturantList.map((resturant, index) => {
                                return (
                                    <tr className='border-1' key={index}>
                                        <td style={{ minWidth: '30px', width: '10%' }}>
                                            <label className='rounded' style={{ color: (((index + 1) % 2) === 0) ? 'blue' : 'orange', backgroundColor: (((index + 1) % 2) === 0) ? 'rgba(0,0,255,0.1)' : 'rgba(255,165,0,0.2)' }}>{index + 1}</label></td>
                                            <td style={{ minWidth: '80px', width: '15%' }} ><img style={{width:'50px', height:'50px'}} src={'https://andesrestaurant.herokuapp.com/api' +resturant.image}></img></td>
                                        <td style={{ minWidth: '80px', width: '20%' }}>{resturant.name}</td>
                                        <td style={{ minWidth: '80px', width: '25%' }}>{resturant.address}</td>
                                        <td style={{ minWidth: '80px', width: '20%' }}>{resturant.contact}</td>
                                        <td style={{ minWidth: '80px', width: '10%' }}>
                                            <Button className="button-edit-delete border-0 text-white rounded" onClick={e => this.editBtnClicked(resturant)} >
                                                <FaEdit style={{ color: 'rgba(0,0,255,0.65)' }} />
                                            </Button>
                                            &nbsp;&nbsp;
                                            <Button className="button-edit-delete border-0 text-white rounded" onClick={e => this.deleteBtnClicked(resturant.id)}>
                                                <FaTrash style={{ color: 'rgba(255,0,0,0.65)' }} />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ResturantList;