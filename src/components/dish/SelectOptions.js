import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
// notification
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";
import {
  fetchDataSuccess,
  calLastPrice,
} from "../../redux/actions/dataActions";

const styles = (theme) => ({

});
class SelectOptions extends Component {
  handleOptionClick = (dIdx, iIdx, oIdx) => {
    // console.log(dIdx,iIdx, oIdx);
    let newDishes = this.props.data.dishes.slice(0);

    newDishes[dIdx].includes[iIdx].optionSelected = oIdx;
    newDishes[dIdx].last_price = calLastPrice(newDishes[dIdx]);
    this.props.dispatch(fetchDataSuccess(newDishes));
  };
  render() {
    const {
      dIdx,
      dish: { includes }
    } = this.props;
    return (
      <>
        {!!includes &&
          includes.map((include, iIdx) => (
            <div key={`${dIdx}-${iIdx}`}>
              <Typography variant="h5" component="h5">
                {include.name}
              </Typography>
              {!!include.options &&
                include.options.map((option, oIdx) => (
                  <Chip
                    key={`${dIdx}-${iIdx}-${oIdx}`}
                    label={`${option.name} $${option.adjust_price / 100}`}
                    onClick={() => this.handleOptionClick(dIdx, iIdx, oIdx)}
                    color={
                      oIdx === parseInt(include.optionSelected)
                        ? "secondary"
                        : "default"
                    }
                  />
                ))}
            </div>
          ))}
      </>
    );
  }
}
SelectOptions.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  fetchDataSuccess: PropTypes.func.isRequired,
  calLastPrice: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});
const mapActionsToProps = (dispatch) => ({
  dispatch,
  fetchDataSuccess,
  calLastPrice,
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withSnackbar(SelectOptions)));

//export default ;
