import React from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import './main.css';
import Login from '../loginView/login';
import Signup from '../registerView/Signup';
import background from "../../img/food.jpeg";


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoginClick: true };
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

    render() {
        const isLoginClick = this.state.isLoginClick;

        return (
            <div className="vh-100"
                style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', margin:'0px'}}>
                 <Row className="row-cols-2 d-flex justify-content-end" style={{margin:'0px'}} >
                    <Col style={{width:'100vh'}}>
                        <Row className="vh-100" style={{margin:'0px'}}>
                            <Row style={{margin:'0px', height:'80px'}}>
                                <Col className='d-flex w-100 justify-content-end pt-4 pb-1' style={{margin:'0px'}}>
                                    <Button className="me-4 h-75"
                                        style={{ backgroundColor: isLoginClick ? 'black' : 'transparent', color: isLoginClick ? 'white' : 'black', borderRadius: '30px'}}
                                        type="submit" variant="contained" onClick={this.loginButton}>
                                        Log in
                                    </Button>
                                    <Button className="me-4 h-75"
                                        style={{ backgroundColor: isLoginClick ? 'transparent' : 'black', color: isLoginClick ? 'black' : 'white', borderRadius: '30px', width: '100px'}}
                                        type="submit" variant="contained" onClick={this.signupButton}>
                                        Sign up
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{margin:'0px', height:'calc(100% - 80px)'}}>
                                  {isLoginClick ? <Login /> : <Signup />}
                            </Row>
                        </Row>
                        {/* <Row className="d-block bg-dark" style={{margin:'0px', height:'calc(100% - 100px)'}}>
                            
                        </Row> */}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Main;
