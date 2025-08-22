import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const TopConcernsCard = ({ data, onClick }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Top 5 Concerns - S500 Customers</Typography>
          <Divider sx={{ mb: 2 }} />
          {data && data.length > 0 ? (
            <List>
              {data.map((item, idx) => (
                <ListItem key={idx} disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <ErrorOutlineIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.concern.length > 70 ? `${item.concern.substring(0, 70)}...` : item.concern}
                    secondary={`Status: ${item.status}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
              <Typography variant="body1" color="text.secondary">No concerns data available</Typography>
            </Box>
          )}
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>Click to view all concerns</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TopConcernsCard;