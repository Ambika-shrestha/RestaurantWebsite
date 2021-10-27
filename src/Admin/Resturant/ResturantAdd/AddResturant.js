import React from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Col, InputGroup, Spinner, Button, Row } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineContacts } from 'react-icons/ai';
import { BiPhone } from "react-icons/bi";
import './AddResturant.css'


class AddResturant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            contact: '',
            image: '',
            error: '',
            isspinning: false,
            nameError: '',
            addressError: '',
            contactError: '',
            imageError: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.addResturentButton = this.addResturentButton.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.onImageChange = this.onImageChange.bind(this);
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

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({
            image: img
                  });
        }
      };

    handleClick = () => {
        this.props.toggleResturant();
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

    addResturentButton = (event) => {
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
            this.addResturantApi()
        }
    }

    addResturantApi = () => {
        this.setState({
            isspinning: true
        });
        const formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('address', this.state.address)
        formData.append('contact', this.state.contact)
        formData.append('image', this.state.image)
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Authorization': 'Token ' + localStorage.getItem('token')
         },
            body: formData
        };
        fetch('https://andesrestaurant.herokuapp.com/api/restaurants/create', requestOptions)
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
                <div className={`formCardResturant mx-auto bg-light p-3 rounded shadow`}>
                    <Form>
                        {this.state.error !== '' ? <h3 className="text-center" style={{ color: 'red' }}>{this.state.error}</h3> : undefined}
                        <h4 className="text-center">Add Resturant</h4>
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">

                                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>

                                    <Form.Control type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" className='input' name="name" placeholder="name" required autoFocus
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
                        <Row>
                            <Form.Group as={Col} className="mb-2">
                                <InputGroup className="mb-2">
                                    <Form.Control type="file" className='input' name="image" placeholder="image" required autoFocus
                                       
                                        onChange={this.onImageChange}/>
                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.imageError === '' ? 'none' : 'block' }}>
                                        {this.state.imageError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <div className='d-flex justify-content-center'>
                            {this.state.isspinning ? <Spinner style={{ width: '3rem', height: '3rem' }} animation="border" variant="primary" /> : <Button className={`w-50 gradient border border-white`} onClick={this.addResturentButton} type="submit">
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


export default withRouter(AddResturant)