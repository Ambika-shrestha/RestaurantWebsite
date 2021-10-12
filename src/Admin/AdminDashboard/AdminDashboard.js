import React from 'react'
import { Form, Button} from 'react-bootstrap'
import {FaPlusCircle} from 'react-icons/fa';
import UserList from '../UserList/UserList'


class AdminDashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
           <div>
                <div className="m-3">
                <ul className="nav nav-tabs">
                    <div className="nav-item me-1 ">
                        <a className="nav-link bg-primary text-white d-flex align-items-center " 
                           style={{ borderRadius: '15px 15px 0px 0px', height:'60px', width:'150px'}} aria-current="page" href="#">User 
                        <Button className='ms-5'><FaPlusCircle/> </Button></a>
                    </div>
                    <li className="nav-item me-1">
                        <a className="nav-link bg-primary text-white d-flex align-items-center " 
                           style={{ borderRadius: '15px 15px 0px 0px' ,height:'60px', width:'150px'}} href="#">Resturant
                           <Button className='ms-3'><FaPlusCircle/> </Button></a>
                    </li>
                    <li className="nav-item me-1">
                        <a className="nav-link bg-primary text-white d-flex align-items-center " 
                           style={{ borderRadius: '15px 15px 0px 0px', height:'60px', width:'150px'}} href="#">Admin
                           <Button className='ms-4'><FaPlusCircle/> </Button></a>
                    </li>
                    </ul>
                    <UserList/>
                </div>
           </div>
        )
    }
}

export default AdminDashboard;