import React from 'react'
import Button from '@restart/ui/esm/Button'
import { FaTrash, FaEdit } from 'react-icons/fa';


class ReviewsList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users: '',
            username: '',
            rating: '',
            comment: '',
            date: '',
            resturant: '',
            reviewList: [],
            error: '',
            isspinning: false,
            usernameError: '',
            ratingError: '',
            commentError: '',
            dateError: '',
            resturantError: ''
        }
    }

    componentDidMount() {
        this.deleteBtnClicked = this.deleteBtnClicked.bind(this)
        this.editBtnClicked = this.editBtnClicked.bind(this)
        this.reviewsListApi()
    }

    dateConversion = (dateUnix) => {
        const date = new Date(dateUnix * 1000);
        return date.toLocaleString()
    }


    deleteBtnClicked = (id) => {
        this.reviewsDeleteApi(id)
    }

    editBtnClicked = (id) => {
        this.props.toggleEditReviews(id)
    }

    reviewsListApi = () => {
        fetch("https://andesrestaurant.herokuapp.com/api/reviews", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
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
                    reviewList: data
                })
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    reviewsDeleteApi = (id) => {
        fetch("https://andesrestaurant.herokuapp.com/api/reviews/" + id, {
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
                this.reviewsListApi()
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
                                <th style={{ minWidth: '80px', width: '15%' }}>NAME</th>
                                <th style={{ minWidth: '80px', width: '15%' }}>RATING</th>
                                <th style={{ minWidth: '80px', width: '20%' }}>COMMENT</th>
                                <th style={{ minWidth: '80px', width: '15%' }}>DATE</th>
                                <th style={{ minWidth: '80px', width: '15%' }}>RESTURANT</th>
                                <th style={{ minWidth: '80px', width: '10%' }}></th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className='w-100 overflow-scroll example' style={{ height: '100%' }}>
                    <table className="table w-100 table-borderless">
                        <tbody>
                            {this.state.reviewList.map((review, index) => {
                                return (
                                    <tr className='border-1' key={index}>
                                        <td style={{ minWidth: '30px', width: '10%' }}>
                                            <label className='rounded' style={{ color: (((index + 1) % 2) === 0) ? 'blue' : 'orange', backgroundColor: (((index + 1) % 2) === 0) ? 'rgba(0,0,255,0.1)' : 'rgba(255,165,0,0.2)' }}>{index + 1}</label></td>
                                        <td style={{ minWidth: '80px', width: '15%' }}>{review.user.first_name} {review.user.last_name}</td>
                                        <td style={{ minWidth: '80px', width: '15%' }}>{review.rating}</td>
                                        <td style={{ minWidth: '80px', width: '20%' }}>{review.comment}</td>
                                        <td style={{ minWidth: '80px', width: '15%' }} >{(this.dateConversion(review.date))}</td>
                                        <td style={{ minWidth: '80px', width: '15%' }} >{review.restaurant}</td>
                                        <td style={{ minWidth: '80px', width: '10%' }}>
                                            <Button className="button-edit-delete border-0 text-white rounded" onClick={e => this.editBtnClicked(review)} >
                                                <FaEdit style={{ color: 'rgba(0,0,255,0.65)' }} />
                                            </Button>
                                            &nbsp;&nbsp;
                                            <Button className="button-edit-delete border-0 text-white rounded" onClick={e => this.deleteBtnClicked(review.id)}>
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

export default ReviewsList;