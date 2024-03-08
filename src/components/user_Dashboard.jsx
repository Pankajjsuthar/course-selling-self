import React from "react";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const UserDashboard = ({ user, purchasedCourses }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
          <Avatar
            alt={user.name}
            src={user.profilePicture}
            sx={{ width: 150, height: 150 }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box>
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {user.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {user.address}
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Purchased Courses
          </Typography>
          <List>
            {purchasedCourses.map((course) => (
              <React.Fragment key={course.id}>
                <ListItem>
                  <ListItemText
                    primary={course.name}
                    secondary={`Duration: ${course.duration}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
