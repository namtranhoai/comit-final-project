import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography";

import PropTypes from 'prop-types';
//import AppIcon from '${process.env.PUBLIC_URL}/images/dish.png';
//MUI
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';
const styles ={
    form:{
        textAlign: 'center'
    },
    image:{
        margin: '20px auto 20px auto'
    },
    pageTitle:{
        margin: '10px auto 10px auto'
    },
    texrField:{
        margin: '10px auto 10px auto'
    },
    button:{
        marginTop: 20,
        position:'relative'
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress:{
        position:'absolute'
    }
};
// import {useHistory} from 'react-router-dom'

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            loading:false,
            errors:{}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors:nextProps.UI.errors})
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        alert('Not implemented yet');
        //this.props.loginUser(userData, this.props.history);
    }
    handleChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render(){
        const {classes,UI:{loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={`${process.env.PUBLIC_URL}/images/dish.png`} alt="Dish"  className={classes.image}/>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true: false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true: false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="h2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary" className={classes.button}>
                            Login
                            { loading && <CircularProgress size={30} className={classes.progress} /> }
                        </Button>


                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Login.propTypes = {
    classes : PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
    user:state.user,
    UI: state.UI
})
const mapActionsToProps={
    loginUser
}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Login));