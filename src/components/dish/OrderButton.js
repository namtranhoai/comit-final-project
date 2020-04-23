import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
// notification
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";
import { updateCart } from "../../redux/actions/dataActions";
const styles = theme => ({
});
class OrderButton extends Component {
  handleAddToCart = () => {
    try {
      let cart = this.props.data.cart.slice(0);
      cart.push(Object.assign({}, this.props.dish));
      this.props.dispatch(updateCart(cart));
      this.props.enqueueSnackbar(
        "Successfully added " +
          this.props.dish.number +
          " " +
          this.props.dish.name,
        {
          variant: "success",
        }
      );
    } catch (err) {
      alert(err);
      this.props.enqueueSnackbar("Error occurred while was attemping to add ", {
        variant: "error",
      });
    }
  };
  render() {
    const { classes, loading } = this.props;
    return (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.handleAddToCart}
        fullWidth
      >
        Add to Order
        {loading && <CircularProgress size={30} className={classes.progress} />}
      </Button>
    );
  }
}
OrderButton.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  updateCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});
const mapActionsToProps = (dispatch) => ({
  dispatch,
  updateCart,
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withSnackbar(OrderButton)));

//export default ;
