import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const PositiveFeedbackCard = ({ data, onClick }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Top 5 Positive Comments - S500 Customers</Typography>
          <Divider sx={{ mb: 2 }} />
          {data && data.length > 0 ? (
            <List>
              {data.map((item, idx) => (
                <ListItem key={idx} disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <ThumbUpIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item.feedback.length > 70 ? `${item.feedback.substring(0, 70)}...` : item.feedback} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
              <Typography variant="body1" color="text.secondary">No feedback data available</Typography>
            </Box>
          )}
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>Click to view all positive feedback</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PositiveFeedbackCard;