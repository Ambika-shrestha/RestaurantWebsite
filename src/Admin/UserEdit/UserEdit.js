import React from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Col, InputGroup, Spinner, Button, Row } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineMail, AiOutlineKey } from 'react-icons/ai';
import { RiUserSettingsLine } from "react-icons/ri";
import './UserEdit.css'


class UserEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: props.user.email,
            firstname: props.user.first_name,
            lastname: props.user.last_name,
            username: props.user.username,
            role: props.user.is_superuser && props.user.is_staff ? 'Admin' : 'User',
            error: '',
            isspinning: false,
            emailError: '',
            firstnameError: '',
            lastnameError: '',
            roleError: '',
            usernameError: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateUserBtn = this.updateUserBtn.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    updateUserBtn = (event) => {
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
            this.userEditApi(this.props.user.id)
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
        this.props.userEditPopUpToggle()
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
        if (this.state.username === '') {
            this.setState({
                usernameError: "Please enter username"
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
                <div className={`formCardEditUser mx-auto bg-light p-3 rounded shadow`}>
                    <Form>
                        {this.state.error !== '' ? <h3 className="text-center" style={{ color: 'red' }}>{this.state.error}</h3> : undefined}
                        <Row>
                            <h4 className="text-center">Update</h4>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineKey /></InputGroup.Text>

                                    <Form.Control type="text" className='input' name="username" placeholder="User name" required autoFocus
                                        value={this.state.username}
                                        onChange={this.handleChange} disabled />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.usernameError === '' ? 'none' : 'block' }}>
                                        {this.state.usernameError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>

                                    <Form.Control type="text" className='input' name="firstname" placeholder="First name" required autoFocus
                                        value={this.state.firstname}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.firstnameError === '' ? 'none' : 'block' }}>
                                        {this.state.firstnameError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>

                                    <Form.Control type="text" className='input' name="lastname" placeholder="Last name" required autoFocus
                                        value={this.state.lastname}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.lastnameError === '' ? 'none' : 'block' }}>
                                        {this.state.lastnameError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineMail /></InputGroup.Text>

                                    <Form.Control type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" className='input' name="email" placeholder="Email" required autoFocus
                                        value={this.state.email}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.emailError === '' ? 'none' : 'block' }}>
                                        {this.state.emailError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">
                                    <InputGroup.Text className="me-2 bg-transparent border-0"><RiUserSettingsLine /></InputGroup.Text>
                                    <Form.Check
                                        className="me-2"
                                        type='radio'
                                        label='Admin'
                                        name='role'
                                        value='Admin'
                                        onChange={this.handleChange}
                                        checked={this.state.role === 'Admin'}
                                    />
                                    <Form.Check
                                        type='radio'
                                        label='User'
                                        name='role'
                                        value='User'
                                        onChange={this.handleChange}
                                        checked={this.state.role === 'User'}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.roleError === '' ? 'none' : 'block' }}>
                                        {this.state.roleError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <div className='d-flex justify-content-center'>
                            {this.state.isspinning ? <Spinner style={{ width: '3rem', height: '3rem' }} animation="border" variant="primary" /> :
                                <Button className={`me-2 gradient border border-white`} onClick={this.updateUserBtn} type="submit">
                                    Update
                                </Button>}
                            <Button className='bg-danger border border-white' onClick={this.handleClick}>Close</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}


export default withRouter(UserEdit)