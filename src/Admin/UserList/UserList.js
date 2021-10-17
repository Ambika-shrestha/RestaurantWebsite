import Button from '@restart/ui/esm/Button'
import React from 'react'
import './UserList.css';
import { FaTrash, FaEdit} from 'react-icons/fa';
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
            <div className='vh-25'>
                <table className="table w-100">
                    <thead>
                    <tr style={{height: '40px'}}>
                        <th></th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>USERNAME</th>
                        <th>ROLE</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className='overflow-scroll'>
                    {this.state.userList.map((user, index) => {
                        return (
                            <tr className='border-1'>
                                <td><label className='rounded' style={{color: (((index+1) % 2) === 0) ? 'blue' : 'orange', backgroundColor:(((index+1) % 2) === 0) ? 'rgba(0,0,255,0.1)' : 'rgba(255,165,0,0.2)'}}>{index+1}</label></td>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td><label className='rounded'  style={{width:'100px',color: user.is_staff && user.is_superuser === true ? 'red': 'blue',
                                     backgroundColor: user.is_staff && user.is_superuser === true ? 'rgba(255,0,0,0.1)' : 'rgba(0,0,255,0.1)'}}>
                                     {user.is_staff && user.is_superuser ? "Admin" : "User"}</label></td>
                                <td><Button className="border-0 text-white rounded"><FaEdit style={{color:'rgba(0,0,255,0.65)'}}/></Button> <Button className="border-0 text-white rounded"><FaTrash style={{color:'rgba(255,0,0,0.65)'}}/></Button></td>
                            </tr>
                        )
                    })}
                    </tbody>

                </table>
            </div>
        )
    }
}

export default UserList;