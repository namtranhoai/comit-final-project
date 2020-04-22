import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";



import CheckoutComp from "../components/checkout/Checkout";

import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";

const styles = theme => ({

});
class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    // const userData = {
    //   email: this.state.email
    // };
    alert("Not implemented yet");
    //this.props.loginUser(userData, this.props.history);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      // classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <>
        <CheckoutComp />
      </>
    );
  }
}

Checkout.propTypes = {
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
)(withStyles(styles)(Checkout));
