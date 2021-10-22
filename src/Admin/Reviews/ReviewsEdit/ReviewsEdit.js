import React from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Col, InputGroup, Spinner, Button, Row } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineMail, AiOutlineKey } from 'react-icons/ai';
import './UserEdit.css'


class ReviewsEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.review.user,
            rating: props.review.rating,
            comment: props.review.comment,
            resturant: props.review.restaurant,
            date: props.review.date,
            error: '',
            isspinning: false,
            userError: '',
            ratingError: '',
            commentError: '',
            dateError: '',
            resturantError: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateReviewBtn = this.updateREviewBtn.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    updateReviewBtn = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log('wrong validaion')
            this.setState({
                error: 'Please enter valid inputs'
            })
            event.stopPropagation();
            return
        }
        if (this.validation()) {
            this.reviewEditApi(this.props.user.id)
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            [name + 'Error']: ''
        });
    }

    handleClick = () => {
        this.props.reviewEditPopUpToggle()
    };

    validation = () => {
        if (this.state.username === '' && this.state.email === '' && this.state.firstname === '' && this.state.lastname === '' && this.state.role === '') {
            this.setState({
                emailError: 'Please enter email',
                firstnameError: 'Please enter first name',
                lastnameError: 'Please enter last name',
                roleError: 'Please select a role'
            })
            return false;
        }
        if (this.state.username === '') {
            this.setState({
                usernameError: "Please enter username"
            })
            return false;
        }
        if (this.state.firstname === '') {
            this.setState({
                firstnameError: "Please enter firstname"
            })
            return false;
        }
        if (this.state.lastname === '') {
            this.setState({
                lastnameError: "Please enter lastname"
            })
            return false;
        }
        if (this.state.email === '') {
            this.setState({
                emailError: "Please enter email"
            })
            return false;
        }
        if (!this.checkEmail()) {
            this.setState({
                emailError: "Invalid email"
            })
            return false;
        }
        if (this.state.role === '') {
            this.setState({
                roleError: "Please select a role"
            })
            return false;
        }
        return true
    }

    checkEmail = () => {
        let filter = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        if (!filter.test(this.state.email)) {
            return false;
        }
        return true
    }

    userEditApi = (id) => {
        this.setState({
            isspinning: true
        });
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                email: this.state.email,
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                is_superuser: this.state.role === 'Admin',
                is_staff: this.state.role === 'Admin'
            })
        };
        fetch('https://andesrestaurant.herokuapp.com/api/users/' + id, requestOptions)
            .then(response => {
                this.setState({
                    isspinning: false
                });
                if (!response.ok) {
                    return response.json().then(json => { throw json.detail; });
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({
                    error: ''
                })
                window.location.reload(true);
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })

    }

    render() {
        return (
            <div className="popup d-flex justify-content-center align-items-center rounded overflow-hidden">
                <div className={`formCardEditReviews mx-auto bg-light p-3 rounded shadow`}>
                    <Form>
                        {this.state.error !== '' ? <h3 className="text-center" style={{ color: 'red' }}>{this.state.error}</h3> : undefined}
                        <h4 className="text-center">Update Reviews</h4>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineMail /></InputGroup.Text>

                                    <Form.Control type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" className='input' name="user" placeholder="User" required autoFocus
                                        value={this.state.user}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.emailError === '' ? 'none' : 'block' }}>
                                        {this.state.userError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>

                                    <Form.Control type="text" className='input' name="rating" placeholder="rating" required autoFocus
                                        value={this.state.rating}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.ratingError === '' ? 'none' : 'block' }}>
                                        {this.state.ratingError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>

                                    <Form.Control type="text" className='input' name="comment" placeholder="Comment" required autoFocus
                                        value={this.state.comment}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.commentError === '' ? 'none' : 'block' }}>
                                        {this.state.commentError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineKey /></InputGroup.Text>

                                    <Form.Control type="text" className='input' name="date" placeholder="date" required autoFocus
                                        value={this.state.date}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.dateError === '' ? 'none' : 'block' }}>
                                        {this.state.dateError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">
                                    <InputGroup.Text><AiOutlineLock /></InputGroup.Text>
                                    <Form.Control type="text" name="resturant" className='input' placeholder="Resturant Name" required
                                        value={this.state.resturant}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.resturantError === '' ? 'none' : 'block' }}>
                                        {this.state.resturantError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <div className='d-flex justify-content-center'>
                            {this.state.isspinning ? <Spinner style={{ width: '3rem', height: '3rem' }} animation="border" variant="primary" /> : <Button className={`w-50 gradient border border-white`} onClick={this.updateReviewBtn} type="submit">
                                Add
                            </Button>}
                            <Button className='bg-danger border border-white' onClick={this.handleClick}>Close</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}


export default withRouter(ReviewsEdit)