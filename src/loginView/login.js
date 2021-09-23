import React,{ Component }  from 'react';
import { Form, Container, Col, InputGroup, Spinner, Button } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineLock, AiOutlineLogin } from 'react-icons/ai';
import './login.css';



class Login extends React.Component{

    constructor(props){
      super(props)
      this.state = {
          username: '',
          password: ''
      }
      this.loginAction = this.loginAction.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    loginAction = (event) =>{
        event.preventDefault()
        console.log('username',this.state.username,this.state.password)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };
        fetch('https://andesrestaurant.herokuapp.com/api/login', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }
    
    handleChange = (event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }); 
    }
    render(){
        return (
           
                <div className={`formCard my-auto mx-auto ml-10`}>
                                <Form>
                                    <h4 className="text-center">Login</h4>
                                    <Form.Row>
                                        <Form.Group as={Col} className="mb-3">
                                            <InputGroup className="mb-2">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>
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
                                    <Form.Row className='d-flex justify-content-center h-10'>
                                        
                                        <Button  className={`w-50 gradient`} type="submit" onClick={this.loginAction}>
                                            Log in
                                        </Button>
                                   
                                    </Form.Row>
                                </Form>
                            </div>
        )
    }
}

export default Login;