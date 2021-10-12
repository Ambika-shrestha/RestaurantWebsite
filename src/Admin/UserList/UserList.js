import Button from '@restart/ui/esm/Button'
import React from 'react'
import './UserList.css';

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
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <table className="table table-bordered w-100 border-1">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>role</th>
                        <th>Action</th>
                    </tr>

                    {this.state.userList.map((user, index) => {
                        return (
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.is_staff && user.is_superuser ? "Admin" : "User"}</td>
                                <td><Button className="border-0 bg-success text-white rounded-pill"> Edit </Button> <Button className="border-0 bg-danger text-white rounded-pill"> Delete </Button></td>
                            </tr>
                        )
                    })}


                </table>
            </div>
        )
    }
}

export default UserList;