import React from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Col, InputGroup, Spinner, Button, Row } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineLock, AiOutlineMail, AiOutlineKey } from 'react-icons/ai';
import './AddUser.css'


class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
      
    }


    render() {
        return (
            <div className={`formCard mx-auto mt-3 mt-xs-0`}>
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
                    <Row>
                    {['radio'].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                            <Form.Check 
                                type={type}
                                id={`default-${type}`}
                                label={`default ${type}`}
                            />

                            <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label={`default ${type}`}
                            />
                            </div>
                            ))}
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        {this.state.isspinning ? <Spinner style={{ width: '3rem', height: '3rem' }} animation="border" variant="primary" /> : <Button className={`w-50 gradient border border-white`} onClick={this.addUserButton} type="submit">
                            Add
                        </Button>}
                    </Row>
                </Form>
            </div>
        )
    }
}


export default withRouter(AddUser)