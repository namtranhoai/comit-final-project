import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Chip from "@material-ui/core/Chip";
// notification
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";
// dish components
import Header from './Header';
import Media from './Media';
import Description from './Desc';
import SelectQty from './SelectQty';
import OrderButton from './OrderButton';
import SelectOptions from './SelectOptions';
// Redux stuff
import { connect } from "react-redux";

const styles = theme => ({
  card: {
    width: 345,
    margin: "10px",
    paddingBottom: "10px",
    position: "relative"
  }
});
class DishCard extends Component {
  render() {
    const {
      classes,
      dIdx
    } = this.props;
    return (
      <Card className={classes.card}>
        <Header dIdx={dIdx} dish={this.props.dish}/>
        <Media dIdx={dIdx} dish={this.props.dish}/>
        <CardContent>
          <Description dish={this.props.dish}/>
          <SelectOptions dIdx={dIdx} dish={this.props.dish}/>
        </CardContent>
        <CardActions disableSpacing>
          <SelectQty dIdx={dIdx} dish={this.props.dish}/>
        </CardActions>
        <CardActions disableSpacing>
          <OrderButton dish={this.props.dish}/>
        </CardActions>
      </Card>
    );
  }
}
DishCard.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI
});
const mapActionsToProps = dispatch => ({
  dispatch,
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withSnackbar(DishCard)));

//export default ;
