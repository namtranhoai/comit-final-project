import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";
//import AppIcon from '${process.env.PUBLIC_URL}/images/dish.png';
//MUI
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
//import {loginUser} from '../redux/actions/userActions';
const styles = {
  info:{
    textAlign: "left"
  },
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  texrField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
};
export class About extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      description: "",
      loading: false,
      errors: {}
    };
  }
  handleSubmit = event => {
    event.preventDefault();
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <div className={classes.info}>
            <h1>ABOUT</h1>
            <address>
              <b>Phone</b>: <a href="tel:+13069336295">(306) 933-6295</a>
              <br />
              <b>Email</b>:{" "}
              <a href="mailto:nellies.sakatoon@gmail.com">nellies.sakatoon@gmail.com</a>
              <br />
              <b>Address</b>: 114 - 15 Innovation Blvd,<br/> Saskatoon, SK S7N 2X8,
            </address>
          </div>
          <hr />
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="name"
              name="name"
              type="text"
              label="Name"
              className={classes.textField}
              helperText={errors.name}
              error={errors.email ? true : false}
              value={this.state.name}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="description"
              label="Description"
              multiline
              rowsMax="4"
              value={this.state.description}
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
              color="primary"
              className={classes.button}
            >
              Add contact
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
About.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  UI: state.UI
});
const mapActionsToProps = {};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(About));
