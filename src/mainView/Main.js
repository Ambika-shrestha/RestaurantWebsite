import React,{ Component }  from 'react';
import { Form, Container, Row, Col, InputGroup, Spinner, Button } from 'react-bootstrap'
import './main.css';
import Login from '../loginView/login';
import Signup from '../registerView/Signup';
import background from "../img/food.jpeg";


class Main extends React.Component{
    
    constructor(props) {
            super(props);
            this.state = {isLoginClick: true};
            // This binding is necessary to make `this` work in the callback
            this.loginButton = this.loginButton.bind(this);
            this.signupButton = this.signupButton.bind(this);
        }

        loginButton = () => {
            this.setState({
                isLoginClick: true
              });
        }
    
          signupButton = () => {
            this.setState({
                isLoginClick: false
              });
          }

    render(){
        const isLoginClick = this.state.isLoginClick;
        
        return (
            <div className={`mh-100 h-100`} 
            style={{backgroundImage: `url(${background})` }}>
             <Row className={`mr-0 ml-0`} >
                <Col>
                </Col>
                <Col>
                    <Row className={`w-100`}>
                        <Col className='d-flex justify-content-end pt-4 pb-1'>
                            <Button className={`mr-4 w-25`} style={{backgroundColor:isLoginClick ? 'black': 'transparent', color: isLoginClick ? 'white':'black', borderRadius:'30px'}} type="submit" variant="contained" onClick={this.loginButton}>
                                Log in
                            </Button>
                            <Button className={`mr-4 w-25`} style={{backgroundColor:isLoginClick ? 'transparent': 'black', color: isLoginClick ? 'black':'white', borderRadius:'30px'}} type="submit" variant="contained" onClick={this.signupButton}>
                              Sign up
                            </Button>
                        </Col>
                    </Row>
                    <Row className={`vh-100`}>
                    { isLoginClick ? <Login/> : <Signup/>} 
                    </Row>
                </Col>
            </Row> 
        </div>
        )
    }
}

export default Main;