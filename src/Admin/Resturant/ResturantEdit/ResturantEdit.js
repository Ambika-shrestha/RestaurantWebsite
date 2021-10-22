import React from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Col, InputGroup, Spinner, Button, Row } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineContacts, AiOutlineFileImage } from 'react-icons/ai';
import { BiPhone } from "react-icons/bi";
import './ResturantEdit.css'


class ResturantEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.resturant.name,
            address: props.resturant.address,
            contact: props.resturant.contact,
            error: '',
            isspinning: false,
            nameError: '',
            addressError: '',
            contactError: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateResturantBtn = this.updateResturantBtn.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    updateResturantBtn = (event) => {
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
            this.resturantEditApi(this.props.resturant.id)
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
        this.props.toggleEditResturant()
    };

    validation = () => {
        if (this.state.name === '' && this.state.address === '' && this.state.contact === '' && this.state.image === '') {
            this.setState({
                nameError: 'Please enter name',
                addressError: 'Please enter first address',
                contactError: 'Please enter last contact',
                imageError: 'Please enter image'
            })
            return false;
        }
        if (this.state.name === '') {
            this.setState({
                nameError: "Please enter name"
            })
            return false;
        }
        if (!this.state.address === '') {
            this.setState({
                addressError: " Please enter address"
            })
            return false;
        }
        if (this.state.contact === '') {
            this.setState({
                contactError: "Please enter contact"
            })
            return false;
        }
        if (this.state.image === '') {
            this.setState({
                lastnameError: "Please enter image"
            })
            return false;
        }
        return true
    }

    resturantEditApi = (id) => {
        console.log('id resturant', id)
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
                name: this.state.name,
                address: this.state.address,
                contact: this.state.contact,
            })
        };
        fetch('https://andesrestaurant.herokuapp.com/api/restaurants/' + id, requestOptions)
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
                <div className={`formCardEditResturant mx-auto bg-light p-3 rounded shadow`}>
                <Form>
                        {this.state.error !== '' ? <h3 className="text-center" style={{ color: 'red' }}>{this.state.error}</h3> : undefined}
                        <h4 className="text-center">Update Resturant</h4>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>

                                    <Form.Control type="text"  className='input' name="name" placeholder="Name" required autoFocus
                                        value={this.state.name}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.nameError === '' ? 'none' : 'block' }}>
                                        {this.state.nameError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineContacts /></InputGroup.Text>

                                    <Form.Control type="text" className='input' name="address" placeholder="Address" required autoFocus
                                        value={this.state.address}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.addressError === '' ? 'none' : 'block' }}>
                                        {this.state.addressError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><BiPhone /></InputGroup.Text>

                                    <Form.Control type="text" className='input' name="contact" placeholder="Contact" required autoFocus
                                        value={this.state.contact}
                                        onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.contactError === '' ? 'none' : 'block' }}>
                                        {this.state.contactError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <div className='d-flex justify-content-center'>
                            {this.state.isspinning ? <Spinner style={{ width: '3rem', height: '3rem' }} animation="border" variant="primary" /> : <Button className={`w-50 gradient border border-white`} onClick={this.updateResturantBtn} type="submit">
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


export default withRouter(ResturantEdit)