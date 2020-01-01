import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { withSnackbar } from "notistack";

//Mui
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import PropTypes from "prop-types";

// Redux stuff

import { connect } from "react-redux";
import { updateCart } from "../redux/actions/dataActions";
const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
});
class Cart extends Component {
  handleRemove = dIdx => {
    let cart = this.props.cart.slice(0);
    cart.splice(dIdx, 1);
    this.props.dispatch(updateCart(cart));
  };
  handleDownClick = dIdx => {
    let cart = this.props.cart.slice(0);
    cart[dIdx].number--;
    if (cart[dIdx].number < 1) cart[dIdx].number = 1;
    this.props.dispatch(updateCart(cart));
  };

  handleUpClick = dIdx => {
    let cart = this.props.cart.slice(0);
    cart[dIdx].number++;
    this.props.dispatch(updateCart(cart));
  };
  render() {
    const { classes, cart } = this.props;
    let totalNumber = 0;
    let totalPay = 0;
    const trMarkup = cart.map((dish, dIdx) => {
      totalNumber += parseInt(dish.number);
      totalPay += (dish.number * dish.lastPrice) / 100;
      return (
        <>
          <TableRow key={dIdx + 1}>
            <TableCell align="center">{dIdx + 1}</TableCell>
            <TableCell component="th" scope="row">
              <>
                {dish.name}
                {!!dish.includes &&
                  dish.includes.map((include, iIdx) => (
                    <div key={`${dIdx}-${iIdx}`}>{include.name}</div>
                  ))}
              </>
            </TableCell>
            <TableCell align="center">
              <ButtonGroup>
                <Button onClick={() => this.handleDownClick(dIdx)}>-</Button>
                <Button>{dish.number}</Button>
                <Button onClick={() => this.handleUpClick(dIdx)}>+</Button>
              </ButtonGroup>
            </TableCell>
            <TableCell align="right">{dish.lastPrice / 100}</TableCell>
            <TableCell align="right">
              {(dish.number * dish.lastPrice) / 100}
            </TableCell>
            <TableCell align="right">
              <IconButton
                aria-label="delete"
                onClick={() => this.handleRemove(dIdx)}
              >
                <ClearIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </>
      );
    });

    return (
      <Paper>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Price($)</TableCell>
              <TableCell align="right">Total($)</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!cart && trMarkup}

            <TableRow>
              <TableCell colSpan={2} align="center">
                Total
              </TableCell>
              <TableCell align="center">{totalNumber}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">{totalPay}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} >
              <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  color="primary"
                  component={Link}
                  to={`${process.env.PUBLIC_URL}/order`}
                  className="nav-button"
                >
                  Back to Order
                </Button>

                <Button
                  disabled={cart.length>0?false:true}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  color="secondary"
                  component={Link}
                  to={`${process.env.PUBLIC_URL}/order`}
                  className="nav-button"
                >
                  Checkout
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

      </Paper>
    );
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
  updateCart: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  classes: state.classes,
  cart: state.data.cart,
  UI: state.UI
});
const mapActionsToProps = dispatch => ({
  dispatch,
  updateCart
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withSnackbar(Cart)));
// export default connect(mapStateToProps, mapActionsToProps)(Order);
