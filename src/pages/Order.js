import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
//import Drawer from "@material-ui/core/Drawer";
// import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";
// Order dishes component
import SearchInput from "../components/SearchInput";
import DishCardComplex from "../components/DishCardComplex";
// import LeftMenu from "../components/LeftMenu";
// import MCart from "../components/MCart";
// Redux stuff
import { connect } from "react-redux";
import { fetchData, openMCart, closeMCart } from "../redux/actions/dataActions";
const styles = theme => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
      marginTop: 300
    }
  }
});
class Order extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData());
    // console.log(this.props)
  }
  closeMCartPanel = () => {
    this.props.dispatch(closeMCart());
  };
  render() {
    const { classes, error, loading, dishes} = this.props;

    if (error) {
      return (
        <div className={classes.root}>
          <div>Error! {error.message}</div>;
        </div>
      );
    }

    if (loading) {
      return (
        <div className={classes.root}>
          <LinearProgress color="secondary" />
        </div>
      );
    }

    const recentDishesMarkup = dishes.map((dish, dIdx) => (
      <DishCardComplex key={dIdx} dIdx={dIdx} dish={dish} />
    ));

    return (
      <Grid container>
        <Grid container justify="center">
          <SearchInput />
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          {recentDishesMarkup}
        </Grid>

        {/* <Drawer anchor="right" open={mcart} onClose={this.closeMCartPanel}>
          <MCart />
        </Drawer> */}
      </Grid>
    );
  }
}

Order.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  openMCart: PropTypes.func.isRequired,
  closeMCart: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  classes: state.classes,
  dishes: state.data.dishes,
  categories: state.data.categories,
  loading: state.data.loading,
  error: state.data.error,
  mcart: state.data.mcart,
  UI: state.UI
});
const mapActionsToProps = dispatch => ({
  dispatch,
  fetchData,
  openMCart,
  closeMCart
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Order));
// export default connect(mapStateToProps, mapActionsToProps)(Order);
