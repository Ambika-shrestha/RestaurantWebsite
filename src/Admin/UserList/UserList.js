import Button from '@restart/ui/esm/Button'
import React from 'react'
import './UserList.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

class UserList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userList: []
        }
    }
    
    componentDidMount(){
        this.deleteBtnClicked = this.deleteBtnClicked.bind(this)
        this.editBtnClicked = this.editBtnClicked.bind(this)
        this.userListApi()
    }

    deleteBtnClicked = (id) =>{
        console.log('id', id)
        this.userDeleteApi(id)   
    }

    editBtnClicked = (id) =>{
        console.log('id', id)
        
    } 

    userListApi = () => {
        fetch("https://andesrestaurant.herokuapp.com/api/users", {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw new Error(response.status);
                }
            })
            .then(data => {
                this.setState({
                    userList: data
                })
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    userDeleteApi = (id) =>{
        fetch("https://andesrestaurant.herokuapp.com/api/users/"+id,{
              method: 'DELETE',
              headers:{
                  'Authorization':'Token ' + localStorage.getItem('token')  
              }  
        })
        .then(response =>{
            if(response.ok){
                return response.json()
            }else{
                throw new Error(response.status)
            }
        })
        .then(data =>{
            console.log('message', data.detail)
            this.userListApi()
        })
        .catch(error =>{
            console.log('error', error)
        })
    }

    userEditApi = (id) => {
     
    }

    render() {
        return (
            <div className='w-100 p-5' style={{ height: '100%' }}>
                <div>
                    <table className="table w-100 mb-0">
                        <thead>
                        <tr style={{ height: '30px' }}>
                            <th style={{ minWidth: '30px', width: '10%' }}></th>
                            <th style={{ minWidth: '80px', width: '20%' }}>NAME</th>
                            <th style={{ minWidth: '80px', width: '25%' }}>EMAIL</th>
                            <th style={{ minWidth: '80px', width: '20%' }}>USERNAME</th>
                            <th style={{ minWidth: '80px', width: '15%' }}>ROLE</th>
                            <th style={{ minWidth: '80px', width: '10%' }}></th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className='w-100 overflow-scroll example' style={{ height: '100%' }}>
                    <table className="table w-100 table-borderless">
                    <tbody>
                        {this.state.userList.map((user, index) => {
                            return (
                                <tr className='border-1' key={index}>
                                    <td style={{ minWidth: '30px', width: '10%' }}>
                                        <label className='rounded' style={{ color: (((index + 1) % 2) === 0) ? 'blue' : 'orange', backgroundColor: (((index + 1) % 2) === 0) ? 'rgba(0,0,255,0.1)' : 'rgba(255,165,0,0.2)' }}>{index + 1}</label></td>
                                    <td style={{ minWidth: '80px', width: '20%' }}>{user.first_name} {user.last_name}</td>
                                    <td style={{ minWidth: '80px', width: '25%' }}>{user.email}</td>
                                    <td style={{ minWidth: '80px', width: '20%' }}>{user.username}</td>
                                    <td style={{ minWidth: '80px', width: '15%' }} >
                                        <label className='rounded' style={{ width: '100px', color: user.is_staff && user.is_superuser === true ? 'red' : 'blue', backgroundColor: user.is_staff && user.is_superuser === true ? 'rgba(255,0,0,0.1)' : 'rgba(0,0,255,0.1)' }}>
                                            {user.is_staff && user.is_superuser ? "Admin" : "User"}
                                        </label>
                                    </td>
                                    <td style={{ minWidth: '80px', width: '10%' }}>
                                        <Button className="button-edit-delete border-0 text-white rounded" onClick={e => this.editBtnClicked(user.id)} >
                                            <FaEdit style={{ color: 'rgba(0,0,255,0.65)' }} />
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button className="button-edit-delete border-0 text-white rounded" onClick={e => this.deleteBtnClicked(user.id)}>
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

export default UserList;