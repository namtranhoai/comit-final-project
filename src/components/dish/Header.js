import React, { PureComponent } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
// notification
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";
import { fetchDataSuccess } from "../../redux/actions/dataActions";

const styles = theme => ({
  avatar: {
    backgroundColor: red[500]
  },
});
class Header extends PureComponent {
  handFavClick = (dIdx) => {
    let newDishes = this.props.data.dishes.slice(0);
    newDishes[dIdx].favorite = newDishes[dIdx].favorite === "1" ? "0" : "1";
    this.props.dispatch(fetchDataSuccess(newDishes));
  };
  //console.log(props.dishes);
  render() {
    const {
      classes,
      dIdx,
      dish:{
        favorite,
        number,
        name,
        base_price
      }

    } = this.props;
    return (
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {number}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="add to favorites"
              onClick={() => this.handFavClick(dIdx)}
            >
              <FavoriteIcon color={favorite === "1" ? `primary` : `inherit`} />
            </IconButton>
          }
          title={name}
          subheader={`base Price:$${base_price / 100}`}
        />
    );
  }
}
Header.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  fetchDataSuccess: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI
});
const mapActionsToProps = dispatch => ({
  dispatch,
  fetchDataSuccess
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withSnackbar(Header)));

//export default ;
