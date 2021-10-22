import React from 'react'
import { Button } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa';
import UserList from '../User/UserList/UserList'
import AddUser from '../User/AddUser/AddUser';
import UserEdit from '../User/UserEdit/UserEdit';
import ResturantList from '../Resturant/ResturantList/ResturantList';
import ReviewsList from '../Reviews/ReviewList/ReviewsList';
import AddResturant from '../Resturant/ResturantAdd/AddResturant';
import ResturantEdit from '../Resturant/ResturantEdit/ResturantEdit';
import AddReviews from '../Reviews/AddReviews/AddReviews';


class AdminDashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpened: false,
            modalEditOpened: false,
            modalResturantOpened:false,
            modalResturantEditOpened:false,
            modalReviewOpened: false,
            selectedIndex: 1,
            user: null,
            resturant:null
        }
        this.addUserBtn = this.addUserBtn.bind(this)
        this.selectedTab = this.selectedTab.bind(this)
        this.addResturantBtn = this.addResturantBtn.bind(this)
        this.addReviewsBtn = this.addReviewsBtn.bind(this)
    }

    addUserBtn = () => {
        this.setState({
            modalOpened: !this.state.modalOpened
        });
    }

    addResturantBtn = () =>{
        this.setState({
            modalResturantOpened: !this.state.modalResturantOpened
        });
    }
    
    addReviewsBtn = () =>{
        this.setState({
            modalReviewOpened: !this.state.modalReviewOpened
        });
    }

    selectedTab = (id) => {
        this.setState({
            selectedIndex: id,
        })
    }
    userEditPopUpToggle = (editPopuser) => {
        this.setState({
            modalEditOpened: !this.state.modalEditOpened,
            user: editPopuser
        })
    }

    toggleEditResturant = (editResturentPop) =>{
        this.setState({
            modalResturantEditOpened : !this.state.modalResturantEditOpened,
            resturant: editResturentPop

        })
    }

    render() {
        return (
            <div className='vh-100' style={{ backgroundColor: 'rgba(244,248,249,1)' }}>
                <div className='m-5 position-absolute start-0 top-0 end-0 bottom-0'>
                    <ul className="nav nav-tabs border-0 ">
                        <div className="nav-item me-2">
                            <div className='nav-link d-flex justify-content-center align-items-center'
                                style={{ borderRadius: '15px 15px 0px 0px', height: '60px', backgroundColor: 'rgba(57, 109, 229, 1)' }}>
                                <Button onClick={e => this.selectedTab(1)} className=" border-0  me-2 text-white d-flex align-items-center"
                                    style={{ height: '60px', backgroundColor: 'rgba(57, 109, 229, 1)' }}>
                                    User
                                </Button>
                                <Button className='me-2 border-0 d-flex justify-content-center align-items-center p-0'
                                    style={{ backgroundColor: 'rgba(57, 109, 229, 1)', height: '20px', width: '20px' }}
                                    onClick={this.addUserBtn}>
                                    <FaPlusCircle />
                                </Button>
                            </div>
                        </div>
                        <li className="nav-item me-2">
                            <div className='nav-link d-flex justify-content-center align-items-center'
                                style={{ borderRadius: '15px 15px 0px 0px', height: '60px', backgroundColor: 'rgba(57, 109, 229, 1)' }}>
                                <Button onClick={e => this.selectedTab(2)} className=" border-0 me-2 text-white d-flex align-items-center"
                                    style={{ height: '60px', backgroundColor: 'rgba(57, 109, 229, 1)' }}>
                                    Resturants
                                </Button>
                                <Button className='me-2 border-0 d-flex justify-content-center align-items-center p-0'
                                    style={{ backgroundColor: 'rgba(57, 109, 229, 1)', height: '20px', width: '20px' }}
                                    onClick={this.addResturantBtn}>
                                    <FaPlusCircle />
                                </Button>
                            </div>
                        </li>
                        <li className="nav-item me-2">
                            <div className='nav-link d-flex justify-content-center align-items-center'
                                style={{ borderRadius: '15px 15px 0px 0px', height: '60px', backgroundColor: 'rgba(57, 109, 229, 1)' }}>
                                <Button onClick={e => this.selectedTab(3)} className="border-0  me-2 text-white d-flex align-items-center"
                                    style={{ height: '60px', backgroundColor: 'rgba(57, 109, 229, 1)' }}>
                                    Reviews
                                </Button>
                                <Button className='me-2 border-0 d-flex justify-content-center align-items-center p-0'
                                    style={{ backgroundColor: 'rgba(57, 109, 229, 1)', height: '20px', width: '20px' }}
                                    onClick={this.addReviewsBtn}>
                                    <FaPlusCircle />
                                </Button>
                            </div>
                        </li>
                    </ul>
                    <div className='bg-white shadow-sm' style={{ height: '95%' }}>
                        {this.state.selectedIndex === 1 && <UserList userEditPopUpToggle={this.userEditPopUpToggle} />}
                        {this.state.selectedIndex === 2 && <ResturantList toggleEditResturant={this.toggleEditResturant}/>}
                        {this.state.selectedIndex === 3 && <ReviewsList />}
                    </div>
                </div>
                {this.state.modalOpened && <AddUser toggle={this.addUserBtn} />}
                {this.state.modalEditOpened && <UserEdit user={this.state.user} userEditPopUpToggle={this.userEditPopUpToggle} />}
                {this.state.modalResturantOpened && <AddResturant toggleResturant={this.addResturantBtn} />}
                {this.state.modalResturantEditOpened && <ResturantEdit resturant={this.state.resturant} toggleEditResturant={this.toggleEditResturant}/>}
                {this.state.modalReviewOpened && <AddReviews toggleReviews={this.addReviewsBtn}/>}
            </div>
        )
    }
}

export default AdminDashboard;