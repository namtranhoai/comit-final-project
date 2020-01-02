import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography";

import PropTypes from 'prop-types';

// Redux stuff
import {connect} from 'react-redux';

const styles ={
    form:{
        textAlign: 'center'
    }
};
class Checkout extends Component {
    render(){
        return (
            <h1>Checkout</h1>
        )
    }
}

Checkout.propTypes = {
    classes : PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
    UI: state.UI
})
const mapActionsToProps={

}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Checkout));