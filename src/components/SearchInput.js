import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
// import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";
import { doSearch } from "../redux/actions/dataActions";

const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
});

class SearchInput extends Component {
  handleSearchChange(event) {
    this.props.dispatch( doSearch(event.currentTarget.value));
    // alert();
    //this.setState({ searchText: event.currentTarget.value });
  }
  handleClickClear(event){
    event.preventDefault();
    this.props.dispatch( doSearch(''));
  }
  handleSubmitClear(event){
    event.preventDefault();
    //this.props.dispatch( doSearch(''));
  }
  render() {
    let { classes, searchText } = this.props;
    return (
      <Paper component="form" className={classes.root} onSubmit={(e) => { e.preventDefault();}}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search ..."
          inputProps={{ "aria-label": "search ..." }}
          value={searchText}
          onChange={this.handleSearchChange.bind(this)}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="clear"
          onClick={this.handleClickClear.bind(this)}
        >
          <ClearIcon color="inherit" />
        </IconButton>
      </Paper>
    );
  }
}

SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  searchText: PropTypes.string,
  doSearch: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  classes: state.classes,
  searchText: state.data.searchText,
  UI: state.UI
});
const mapActionsToProps = dispatch => ({
  dispatch,
  doSearch
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SearchInput));
