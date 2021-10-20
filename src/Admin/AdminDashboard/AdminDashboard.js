import React from 'react'
import { Button } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa';
import UserList from '../UserList/UserList'
import AddUser from '../AddUser/AddUser';
import UserEdit from '../UserEdit/UserEdit';


class AdminDashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpened: false,
            modalEditOpened: false,
            user: null
        }
        this.addUserBtn = this.addUserBtn.bind(this)
    }

    addUserBtn = () => {
        this.setState({
            modalOpened: !this.state.modalOpened
        });
    }

    userEditPopUpToggle = (editPopuser) => {
        this.setState({
            modalEditOpened: !this.state.modalEditOpened,
            user: editPopuser
        })
    }
    render() {
        return (
            <div className='vh-100' style={{ backgroundColor: 'rgba(244,248,249,1)' }}>
                <div className='m-5 position-absolute start-0 top-0 end-0 bottom-0'>
                    <ul className="nav nav-tabs border-0 ">
                        <div className="nav-item me-2">
                            <a className="nav-link text-white d-flex align-items-center "
                                style={{ borderRadius: '15px 15px 0px 0px', height: '60px', width: '130px', backgroundColor: 'rgba(57, 109, 229, 1)' }} aria-current="page" href="#">User
                                <Button className='ms-5 border-0 d-flex justify-content-center align-items-center p-0'
                                    style={{ backgroundColor: 'rgba(57, 109, 229, 1)', height: '20px', width: '20px' }}
                                    onClick={this.addUserBtn}>
                                    <FaPlusCircle /> </Button></a>
                        </div>
                        <li className="nav-item me-2">
                            <a className="nav-link text-white d-flex align-items-center "
                                style={{ borderRadius: '15px 15px 0px 0px', height: '60px', width: '130px', backgroundColor: 'rgba(57, 109, 229, 1)' }} href="#">Resturant
                                <Button className='ms-3 border-0 d-flex justify-content-center align-items-center p-0' style={{ backgroundColor: 'rgba(57, 109, 229, 1)', height: '20px', width: '20px' }}>
                                    <FaPlusCircle /> </Button></a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link text-white d-flex align-items-center "
                                style={{ borderRadius: '15px 15px 0px 0px', height: '60px', width: '130px', backgroundColor: 'rgba(57, 109, 229, 1)' }} href="#">Admin
                                <Button className='ms-4 border-0 d-flex justify-content-center align-items-center p-0' style={{ backgroundColor: 'rgba(57, 109, 229, 1)', height: '20px', width: '20px' }}>
                                    <FaPlusCircle /> </Button></a>
                        </li>
                    </ul>
                    <div className='bg-white shadow-sm' style={{ height: '95%' }}>
                        <UserList userEditPopUpToggle={this.userEditPopUpToggle} />
                    </div>
                </div>
                {this.state.modalOpened && <AddUser toggle={this.addUserBtn} />}
                {this.state.modalEditOpened && <UserEdit user={this.state.user} userEditPopUpToggle={this.userEditPopUpToggle} />}
            </div>
        )
    }
}

export default AdminDashboard;