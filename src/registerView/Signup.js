import React from 'react';
import { Form, Col, InputGroup, Spinner, Button } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineLock, AiOutlineMail, AiOutlineKey } from 'react-icons/ai';
import './signup.css';


class Signup extends React.Component{
    constructor(props){
       super(props)
       this.state={
           email: '',
           username:'',
           password:'',
           confirmPassword:'',
           firstname:'',
           lastname:'',
           error:'',
           isspinning: false,
           
       } 
       this.handleChange = this.handleChange.bind(this)
       this.signupButton = this.signupButton.bind(this)
    }

    handleChange = (event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }); 
    }

    signupButton = (event) =>{
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
        debugger;
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
                is_superuser: false,
                is_staff: false
            })
        };
        fetch('https://andesrestaurant.herokuapp.com/api/register', requestOptions)
            .then(response => {
                this.setState({
                    isspinning: false
                  });
                if(!response.ok) {
                    throw new Error(response.status);
                  }
                else{
                    return response.json();
                    } 
            })
            .then(data => {
            this.setState({
                error : ''
            })
        })
            .catch(error => {
                this.setState({
                    error : 'User already exist'
                })
        })
    }

    render(){
        return (
            <div className={`formCard mx-auto ml-10 mt-5`}>
                                <Form>
                                {this.state.error !== '' ? <h3 className="text-center"  style ={{color:'red'}}>{this.state.error}</h3> : undefined }
                                    <h4 className="text-center">Sign up</h4>
                                    <Form.Row>
                                        <Form.Group as={Col} className="mb-3">
                                            <InputGroup className="mb-2">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><AiOutlineMail /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" className='input' name="email" placeholder="Email" required autoFocus 
                                                value={this.state.email}
                                                onChange={this.handleChange}/>
                                                <Form.Control.Feedback  type="invalid">
                                                    Email is required.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} className="mb-3">
                                            <InputGroup className="mb-2">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" className='input' name="firstname" placeholder="First name" required autoFocus 
                                                value={this.state.firstname}
                                                onChange={this.handleChange}/>
                                                <Form.Control.Feedback type="invalid">
                                                   First name is required.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} className="mb-3">
                                            <InputGroup className="mb-2">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" className='input' name="lastname" placeholder="Last name" required autoFocus 
                                                value={this.state.lastname}
                                                onChange={this.handleChange}/>
                                                <Form.Control.Feedback type="invalid">
                                                    Last name is required.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} className="mb-3">
                                            <InputGroup className="mb-2">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><AiOutlineKey /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" className='input' name="username" placeholder="Username" required autoFocus 
                                                value={this.state.username}
                                                onChange={this.handleChange}/>
                                                <Form.Control.Feedback type="invalid">
                                                    Username is required.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} className="mb-3">
                                            <InputGroup className="mb-2">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><AiOutlineLock /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="password" name="password" className='input' placeholder="Password" required 
                                                 value={this.state.password}
                                                 onChange={this.handleChange}/>
                                                <Form.Control.Feedback type="invalid">
                                                    Password is required.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} className="mb-3">
                                            <InputGroup className="mb-2">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><AiOutlineLock /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="password" name="confirmPassword" className='input' placeholder="Confirm Password" required 
                                                 value={this.state.confirmPassword}
                                                 onChange={this.handleChange}/>
                                                <Form.Control.Feedback type="invalid">
                                                    Confirm password is required.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row className='d-flex justify-content-center h-10'>
                                    {this.state.isspinning ? <Spinner style ={{width: '3rem', height: '3rem'}} animation="border" variant="primary"/> : <Button  className={`w-50 gradient`}  onClick={this.signupButton} type="submit">
                                            Sign up
                                        </Button>}   
                                    </Form.Row>
                                </Form>
                            </div>
          

        )
    }
}

export default Signup;
