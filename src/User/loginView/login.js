import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Col, InputGroup, Spinner, Button, Row } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import './login.css';



class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isspinning: false,
            error: '',
            usernameError: '',
            passwordError: ''
        }
        this.loginAction = this.loginAction.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    validation = () => {
        if (this.state.username === '' && this.state.password === '') {
            this.setState({
                usernameError: "Please enter username",
                passwordError: "Please enter password"
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
        return true
    }
    loginAction = (event) => {
        event.preventDefault()
        //ture or false
        if (this.validation()) {
            this.loginApi()
        }
    }

    loginApi = () => {
        this.setState({
            isspinning: true
        });

        console.log('username', this.state.username, this.state.password)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };
        fetch('https://andesrestaurant.herokuapp.com/api/login', requestOptions)
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
                localStorage.setItem('token', data['key']);
                localStorage.setItem('user', data['user']['id']);
                this.setState({
                    error: ''
                })
                if (data['user']['is_superuser'] === false && data['user']['is_staff'] === false) {
                    this.props.history.push("/dashboard")
                }
                else {
                    this.props.history.push("/adminDashboard")
                }

            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            [name + 'Error']: '',
        });
    }
    render() {
        return (
            <div className={`formCard my-auto mx-auto ml-10`}>
                <Form>
                    {this.state.error !== '' ? <h3 className="text-center" style={{ color: 'red' }}>{this.state.error}</h3> : undefined}
                    <h4 className="text-center">Log in</h4>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><AiOutlineUser /></InputGroup.Text>
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
                        <Form.Group as={Col} className="mb-3">
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
                    <Row className='d-flex justify-content-center h-10'>
                        {this.state.isspinning ? <Spinner style={{ width: '3rem', height: '3rem' }} animation="border" variant="primary" /> : <Button className={`w-50 gradient ml-2 border border-white`} type="submit" onClick={this.loginAction}>
                            Log in
                        </Button>}
                    </Row>
                </Form>
            </div>
        )
    }
}


export default withRouter(Login);