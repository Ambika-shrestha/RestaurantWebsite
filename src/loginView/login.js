import React from 'react';
import { withRouter} from 'react-router-dom';
import { Form, Col, InputGroup, Spinner, Button } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import './login.css';



class Login extends React.Component{

    constructor(props){
      super(props)
      this.state = {
          username: '',
          password: '',
          isspinning: false,
          error: '',
          usernameError:'',
          passwordError:''
      }
      this.loginAction = this.loginAction.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    
    validation =() =>{
        if(this.state.username === '' && this.state.password === ''){
            this.setState({
                usernameError: "Please enter username",
                passwordError: "Please enter password"
            })
            return false;
        }
        if(this.state.username === ''){
            this.setState({
                usernameError: "Please enter username"
            })
            return false;
        }
        if(this.state.password === ''){
            this.setState({
                passwordError: "Please enter password"
            })
            return false;
        }
        return true
    }
    loginAction = (event) =>{
        event.preventDefault()
        //ture or false
        if(this.validation()){
           this.loginApi()
        }   
    }

    loginApi = () =>{
        this.setState({
            isspinning: true
          });
    
    console.log('username',this.state.username,this.state.password)
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
           this.props.history.push("/dashboard")
        })
        .catch(error => {
            this.setState({
                error : 'Unauthorized user !'
            })
        })
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
                                {this.state.error !== '' ? <h3 className="text-center"  style ={{color:'red'}}>{this.state.error}</h3> : undefined }
                                    <h4 className="text-center">Log in</h4>
                                    <Form.Row>
                                        <Form.Group as={Col} className="mb-3">
                                            <InputGroup className="mb-2">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" className='input' name="username" placeholder="Username" required autoFocus 
                                                value={this.state.username}
                                                onChange={this.handleChange}/>
                                                <Form.Control.Feedback type="invalid" style={{display:this.state.usernameError === '' ? 'none' : 'block' }}>
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
                                                <Form.Control.Feedback type="invalid" style={{display:this.state.passwordError === '' ? 'none' : 'block' }}>
                                                    Password is required.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row className='d-flex justify-content-center h-10'>
                                    {this.state.isspinning ? <Spinner style ={{width: '3rem', height: '3rem'}}  animation="border" variant="primary"/> :  <Button  className={`w-50 gradient ml-2`} type="submit" onClick={this.loginAction}>
                                            Log in
                                        </Button>} 
                                    </Form.Row>
                                </Form>
                            </div>
        )
    }
}


export default withRouter(Login);