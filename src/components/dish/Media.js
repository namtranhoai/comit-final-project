import React, { PureComponent } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CardMedia from "@material-ui/core/CardMedia";
// notification
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
});
class Media extends PureComponent {
  render() {
    const {
      classes,
      //dIdx,
      dish: {
        name,
        image_url
      }
    } = this.props;
    return (
        <CardMedia
          className={classes.media}
          image={`${process.env.PUBLIC_URL}${image_url}`}
          title={name}
        />
    );
  }
}
Media.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI
});
const mapActionsToProps = dispatch => ({
  dispatch
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withSnackbar(Media)));

//export default ;
