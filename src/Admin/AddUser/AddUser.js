import React from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Col, InputGroup, Spinner, Button, Row } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineLock, AiOutlineMail, AiOutlineKey } from 'react-icons/ai';
import { RiUserSettingsLine} from "react-icons/ri";
import './AddUser.css'


class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            firstname: '',
            lastname: '',
            role: '',
            error: '',
            isspinning: false,
            emailError: '',
            firstnameError: '',
            lastnameError: '',
            usernameError: '',
            passwordError: '',
            confirmPasswordError: '',
            roleError: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.addUserButton = this.addUserButton.bind(this)
        this.handleClick = this.handleClick.bind(this)
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
        this.props.toggle();
    };
    validation = () => {
        if (this.state.username === '' && this.state.password === '' && this.state.email === ''
            && this.state.firstname === '' && this.state.lastname === '' && this.state.confirmPassword === '' && this.state.role === '') {
            this.setState({
                emailError: 'Please enter email',
                firstnameError: 'Please enter first name',
                lastnameError: 'Please enter last name',
                usernameError: 'Please enter username',
                passwordError: 'Please enter password',
                confirmPasswordError: 'Please enter confirm password',
                roleError:'Please select a role'
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
        if (!this.checkPassword()) {
            this.setState({
                passwordError: "Minimum eight characters,at least one uppercase letter, one lowercase letter, one number and one special character"
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
        if (this.state.password === '') {
            this.setState({
                passwordError: "Please enter password"
            })
            return false;
        }
        if (this.state.confirmPassword === '') {
            this.setState({
                confirmPasswordError: "Please enter confirm password"
            })
            return false;
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                confirmPasswordError: "Confirm password does not match with password"
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

    checkPassword = () => {
        let filter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!filter.test(this.state.password)) {
            return false;
        }
        return true
    }

    addUserButton = (event) => {
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
            this.addUserApi()
        }
    }

    addUserApi = () => {
        this.setState({
            isspinning: true
        });
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                is_superuser: this.state.role === 'Admin',
                is_staff: this.state.role === 'Admin'
            })
        };
        fetch('https://andesrestaurant.herokuapp.com/api/register', requestOptions)
            .then(response => {
                this.setState({
                    isspinning: false
                });
                if (!response.ok) {
                    throw new Error(response.status);
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
                    error: 'User already exist'
                })
            })
    }

    render() {
        return (
            <div className="popup d-flex justify-content-center align-items-center rounded overflow-hidden">
                <div className={`formCardAddUser mx-auto bg-light p-3 rounded shadow`}>
                    <Form>
                        {this.state.error !== '' ? <h3 className="text-center" style={{ color: 'red' }}>{this.state.error}</h3> : undefined}
                        <h4 className="text-center">Sign up</h4>
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

                                    <InputGroup.Text><AiOutlineKey /></InputGroup.Text>

                                    <Form.Control type="text" className='input' name="username" placeholder="Username" required autoFocus
                                        value={this.state.username}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.usernameError === '' ? 'none' : 'block' }}>
                                        {this.state.usernameError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">
                                    <InputGroup.Text><AiOutlineLock /></InputGroup.Text>
                                    <Form.Control type="password" name="password" className='input' placeholder="Password" required
                                        value={this.state.password}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.passwordError === '' ? 'none' : 'block' }}>
                                        {this.state.passwordError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineLock /></InputGroup.Text>

                                    <Form.Control type="password" name="confirmPassword" className='input' placeholder="Confirm Password" required
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.confirmPasswordError === '' ? 'none' : 'block' }}>
                                        {this.state.confirmPasswordError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row  className="mb-2">
                        <Form.Group as={Col} className="mb-2">
                        <InputGroup className="mb-2">
                            <InputGroup.Text  className="me-2 bg-transparent border-0"><RiUserSettingsLine/></InputGroup.Text>
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
                            {this.state.isspinning ? <Spinner style={{ width: '3rem', height: '3rem' }} animation="border" variant="primary" /> : <Button className={`w-50 gradient border border-white`} onClick={this.addUserButton} type="submit">
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


export default withRouter(AddUser)