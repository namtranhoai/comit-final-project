import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Chip from "@material-ui/core/Chip";
// notification
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";
import { fetchDataSuccess, updateCart, calLastPrice } from "../redux/actions/dataActions";

const styles = theme => ({
  cardWrapper: {
    paddingBottom: 0,
    marginBottom: 0
  },
  card: {
    width: 345,
    margin: "10px",
    paddingBottom: "10px",
    position: "relative"
  },
  cardContent: {
    height: "200px",
    [theme.breakpoints.down("md")]: {
      width: "200px"
    },
    overflow: "hidden"
  },
  centeredCardConent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  lastPrice:{
    backgroundColor: red[100],
    marginLeft: "auto",
    padding: "5px 15px"
  }
});
class DishCardComplex extends Component {
  handleOptionClick = (dIdx,iIdx, oIdx) => {
    // console.log(dishIdx,iIdx, oIdx);
    let newDishes = this.props.data.dishes.slice(0);
    newDishes[dIdx].includes[iIdx].optionSelected=oIdx;
    newDishes[dIdx].last_price = calLastPrice(newDishes[dIdx]);
    this.props.dispatch(fetchDataSuccess(newDishes));

  };
  handleDownClick = (dIdx) => {
    let newDishes = this.props.data.dishes.slice(0);
    newDishes[dIdx].number--;
    if (newDishes[dIdx].number < 1) newDishes[dIdx].number = 1;
    this.props.dispatch(fetchDataSuccess(newDishes));
  };
  handFavClick = (dIdx) => {
    let newDishes = this.props.data.dishes.slice(0);
    newDishes[dIdx].favorite = newDishes[dIdx].favorite === "1" ? "0" : "1";
    this.props.dispatch(fetchDataSuccess(newDishes));
  };
  handleUpClick = (dIdx) => {
    let newDishes = this.props.data.dishes.slice(0);
    newDishes[dIdx].number++;
    this.props.dispatch(fetchDataSuccess(newDishes));
  };
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
          variant: "success"
        }
      );
    } catch (err) {
      this.props.enqueueSnackbar("Error occurred while was attemping to add ", {
        variant: "error"
      });
    }
  };
  //console.log(props.dishes);
  render() {
    const {
      classes,
      dIdx,
      dish: {
        favorite,
        number,
        name,
        description,
        base_price,
        last_price,
        image_url,
        includes
      },
      loading
    } = this.props;
    const imageBaseUrl = image_url;
    return (
      <Card className={classes.card}>
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
          subheader={`base Price:${base_price / 100}$`}
        />
        <CardMedia
          className={classes.media}
          image={`${process.env.PUBLIC_URL}${imageBaseUrl}`}
          title={name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
            {/* <DishIncludes key={`includes-${code}`} code={code} includes={includes} /> */}
            {!!includes &&
              includes.map((include,iIdx) => (
                <div key={`${dIdx}-${iIdx}`}>
                  <Typography variant="h5" component="h5">
                    {include.name}
                  </Typography>
                  {!!include.options &&
                    include.options.map((option, oIdx) => (
                      <Chip
                        key={`${dIdx}-${iIdx}-${oIdx}`}
                        label={`${option.name} ${option.adjustPrice}$`}
                        onClick={()=>this.handleOptionClick(dIdx,iIdx,oIdx)}
                        color={oIdx === parseInt(include.optionSelected) ? "secondary" : "default"}
                      />
                    ))}
                </div>
              ))
              }

        </CardContent>
        <CardActions disableSpacing>
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
        </CardActions>
        <CardActions disableSpacing>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleAddToCart}
            fullWidth
          >
            Add to Order
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </CardActions>
        <div></div>
      </Card>
    );
  }
}
DishCardComplex.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  fetchDataSuccess: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  calLastPrice: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI
});
const mapActionsToProps = dispatch => ({
  dispatch,
  fetchDataSuccess,
  updateCart,
  calLastPrice
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withSnackbar(DishCardComplex)));

//export default ;
