import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Desc(props){
  return(
          <Typography variant="body2" color="textSecondary" component="p">
            {props.dish.description}
          </Typography>
  )
};
