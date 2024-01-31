import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const course_card_admin = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.imageLink}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom >
          {props.courseName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" variant="text">Update</Button>
        <Button size="small" variant="text">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default course_card_admin;
