import React, { Component } from "react";
import { withStyles } from '@material-ui/styles';

import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";
import { openMCart, closeMCart } from "../redux/actions/dataActions";
const styles = theme => ({
  list: {
    width: 300
  },
  fullList: {
    width: "auto"
  }
});
class MCart extends Component {

  render() {
    const { classes, cart } = this.props;
    let totalNumber = 0;
    let totalPay = 0;
    const trMarkup = cart.map((dish, dIdx) => {
      totalNumber += parseInt(dish.number);
      totalPay += (dish.number * dish.last_price) / 100;
      return (
        <>
          {dish.name}
        </>

      );
    });
    return (
      <>
      {trMarkup}
      </>
    );
  }
}
MCart.propTypes = {
  data: PropTypes.object.isRequired,
  openMCart: PropTypes.func.isRequired,
  closeMCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.data.cart,
  UI: state.UI
});
const mapActionsToProps = dispatch => ({
  dispatch,
  openMCart,
  closeMCart
});
export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)(MCart));
