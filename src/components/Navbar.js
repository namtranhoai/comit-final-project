import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";


import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";
import { openMCart } from "../redux/actions/dataActions";
class Navbar extends Component {
  render() {
    const {
      data: { cart }
    } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Button
            color="inherit"
            component={Link}
            to={`${process.env.PUBLIC_URL}/`}
            className="nav-button"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to={`${process.env.PUBLIC_URL}/order`}
            className="nav-button"
          >
            ORDER
          </Button>
          <IconButton
            aria-label="4 pending messages"
            // onClick={() => this.props.dispatch(openMCart())}
            component={Link}
            to={`${process.env.PUBLIC_URL}/cart`}
          >
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
          <Button
            color="inherit"
            component={Link}
            to={`${process.env.PUBLIC_URL}/about`}
            className="nav-button"
          >
            About
          </Button>
          <Button
            color="inherit"
            component={Link}
            to={`${process.env.PUBLIC_URL}/login`}
            className="nav-button"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  data: PropTypes.object.isRequired,
  openMCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI
});
const mapActionsToProps = dispatch => ({
  dispatch,
  openMCart
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navbar);
