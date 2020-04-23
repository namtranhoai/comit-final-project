import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Chip from "@material-ui/core/Chip";
// notification
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import { fetchDataSuccess } from "../../redux/actions/dataActions";


class SelectQty extends Component {
  handleDownClick = (dIdx) => {
    let newDishes = this.props.data.dishes.slice(0);
    newDishes[dIdx].number--;
    if (newDishes[dIdx].number < 1) newDishes[dIdx].number = 1;
    this.props.dispatch(fetchDataSuccess(newDishes));
  };
  handleUpClick = (dIdx) => {
    let newDishes = this.props.data.dishes.slice(0);
    newDishes[dIdx].number++;
    this.props.dispatch(fetchDataSuccess(newDishes));
  };
  render() {
    const {
      dIdx,
      dish: {
        number,
        last_price
      }
    } = this.props;
    return (
          <>
          <ButtonGroup>
            <Button onClick={()=>this.handleDownClick(dIdx)}>-</Button>
            <Button>{number}</Button>
            <Button onClick={()=>this.handleUpClick(dIdx)}>+</Button>
          </ButtonGroup>
          <Chip
              label={`last Price: ${last_price/100}$`}
              color="secondary"
            />
          <Chip
              label={`total: ${number*last_price/100}$`}
              color="secondary"
          />
          </>
    );
  }
}
SelectQty.propTypes = {
  data: PropTypes.object.isRequired,
  fetchDataSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  data: state.data
});
const mapActionsToProps = dispatch => ({
  dispatch,
  fetchDataSuccess
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)((withSnackbar(SelectQty)));

//export default ;
