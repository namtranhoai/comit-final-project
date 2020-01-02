import React, { Component } from "react";
import Box from '@material-ui/core/Box';
import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";
import { openMCart } from "../redux/actions/dataActions";
class LeftMenu extends Component {
  handleCategoryClick = cid => {
    let newCat = this.props.categories.slice(0);
    newCat[cid].active = newCat[cid].active ? false : true;
    console.log(newCat);
    // this.props.dispatch(fetchDataSuccess(newDishes));
  };
  render() {
    const { categories } = this.props;
    const leftCategories = categories.map((cat, dIdx) => (
      <Box
        key={cat.id}
        onClick={() => this.handleCategoryClick(cat.id)}
        bgcolor="secondary.main"
        color="secondary.contrastText"
        p={2}
      >
        {cat.name}
      </Box>
    ));
    return <div>{leftCategories}</div>;
  }
}

LeftMenu.propTypes = {
  categories: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  categories: state.data.categories,
  UI: state.UI
});
const mapActionsToProps = dispatch => ({
  dispatch
});
export default connect(mapStateToProps, mapActionsToProps)(LeftMenu);
