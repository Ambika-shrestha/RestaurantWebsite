import React,{ Component }  from 'react';
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
        console.log('username',
        this.state.email,
        this.state.username, 
       this.state.password,
       this.state.confirmPassword,
        this.state.firstname,
       this.state.lastname,
        )
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
                is_staff: false,
            })
        };
        fetch('https://andesrestaurant.herokuapp.com/api/register', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    render(){
        return (
            <div>
            {/* <Container maxWidth="xs" align= "right"> 
                <form>
                    <Typography variant='h5' align='center'>
                       SignUp
                    </Typography>
                    <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Email" name="email" size="small" variant="outlined" 
                            onChange={this.handleChange}
                            value={this.state.email}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            size="small"
                            type="password"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            size="small"
                            type="password"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="username" name="username" size="small" variant="outlined" 
                            onChange={this.handleChange}
                            value={this.state.username}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="firstname" name="firstname" size="small" variant="outlined" 
                            onChange={this.handleChange}
                            value={this.state.firstname}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="lastname" name="lastname" size="small" variant="outlined" 
                            onChange={this.handleChange}
                            value={this.state.lastname}/>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" fullWidth type="submit" variant="contained" onClick={this.signupButton}>
                        SignUp
                        </Button>
                    </Grid>
                    </Grid>
                </form>
    </Container> */}
    </div>
        )
    }
}

export default Signup;