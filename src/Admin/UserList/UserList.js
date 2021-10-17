import Button from '@restart/ui/esm/Button'
import React from 'react'
import './UserList.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
class UserList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userList: [
                {
                    "username": "vishal",
                    "email": "vishalkalola196@gmail.com",
                    "first_name": "vishal",
                    "last_name": "vishal",
                    "is_superuser": true,
                    "is_staff": true,
                    "id": 25
                },
                {
                    "username": "Aliza",
                    "email": "aliza.pathak@epita.fr",
                    "first_name": "aliza",
                    "last_name": "Pathak",
                    "is_superuser": false,
                    "is_staff": false,
                    "id": 26
                },
                {
                    "username": "sim",
                    "email": "surbhi@gmail.com",
                    "first_name": "Simpy",
                    "last_name": "Surbhi",
                    "is_superuser": false,
                    "is_staff": false,
                    "id": 27
                },
                {
                    "username": "ambi",
                    "email": "Amb@gmail.com",
                    "first_name": "Ambi",
                    "last_name": "Shreshtha",
                    "is_superuser": false,
                    "is_staff": false,
                    "id": 1
                },
                {
                    "username": "simpy",
                    "email": "simpy@gmail.com",
                    "first_name": "Simpy",
                    "last_name": "Surbhi",
                    "is_superuser": false,
                    "is_staff": false,
                    "id": 28
                },
                {
                    "username": "vishal",
                    "email": "vishalkalola196@gmail.com",
                    "first_name": "vishal",
                    "last_name": "vishal",
                    "is_superuser": true,
                    "is_staff": true,
                    "id": 25
                },
                {
                    "username": "Aliza",
                    "email": "aliza.pathak@epita.fr",
                    "first_name": "aliza",
                    "last_name": "Pathak",
                    "is_superuser": false,
                    "is_staff": false,
                    "id": 26
                },
                {
                    "username": "sim",
                    "email": "surbhi@gmail.com",
                    "first_name": "Simpy",
                    "last_name": "Surbhi",
                    "is_superuser": false,
                    "is_staff": false,
                    "id": 27
                },
                {
                    "username": "ambi",
                    "email": "Amb@gmail.com",
                    "first_name": "Ambi",
                    "last_name": "Shreshtha",
                    "is_superuser": false,
                    "is_staff": false,
                    "id": 1
                },
                {
                    "username": "simpy",
                    "email": "simpy@gmail.com",
                    "first_name": "Simpy",
                    "last_name": "Surbhi",
                    "is_superuser": false,
                    "is_staff": false,
                    "id": 28
                }

            ]
        }
    }

    render() {
        return (
            <div className='w-100 p-5' style={{ height: '100%' }}>
                <div>
                    <table className="table w-100">
                        <tr style={{ height: '30px' }}>
                            <th style={{ minWidth: '30px', width: '10%' }}></th>
                            <th style={{ minWidth: '80px', width: '20%' }}>NAME</th>
                            <th style={{ minWidth: '80px', width: '20%' }}>EMAIL</th>
                            <th style={{ minWidth: '80px', width: '20%' }}>USERNAME</th>
                            <th style={{ minWidth: '80px', width: '15%' }}>ROLE</th>
                            <th style={{ minWidth: '80px', width: '15%' }}></th>
                        </tr>
                    </table>
                </div>
                <div className='w-100 overflow-scroll' style={{ height: '100%' }}>
                    <table className="table w-100 table-borderless">
                        {this.state.userList.map((user, index) => {
                            return (
                                <tr className='border-1'>
                                    <td style={{ minWidth: '30px', width: '10%' }}><label className='rounded' style={{ color: (((index + 1) % 2) === 0) ? 'blue' : 'orange', backgroundColor: (((index + 1) % 2) === 0) ? 'rgba(0,0,255,0.1)' : 'rgba(255,165,0,0.2)' }}>{index + 1}</label></td>
                                    <td style={{ minWidth: '80px', width: '20%' }}>{user.first_name} {user.last_name}</td>
                                    <td style={{ minWidth: '80px', width: '20%' }}>{user.email}</td>
                                    <td style={{ minWidth: '80px', width: '20%' }}>{user.username}</td>
                                    <td style={{ minWidth: '80px', width: '15%' }} >
                                        <label className='rounded' style={{ width: '100px', color: user.is_staff && user.is_superuser === true ? 'red' : 'blue', backgroundColor: user.is_staff && user.is_superuser === true ? 'rgba(255,0,0,0.1)' : 'rgba(0,0,255,0.1)' }}>
                                            {user.is_staff && user.is_superuser ? "Admin" : "User"}
                                        </label>
                                    </td>
                                    <td style={{ minWidth: '80px', width: '15%' }}>
                                        <Button className="border-0 text-white rounded">
                                            <FaEdit style={{ color: 'rgba(0,0,255,0.65)' }} />
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button className="border-0 text-white rounded">
                                            <FaTrash style={{ color: 'rgba(255,0,0,0.65)' }} />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        )
    }
}

export default UserList;