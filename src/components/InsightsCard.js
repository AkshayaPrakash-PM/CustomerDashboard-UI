import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const InsightsCard = ({ data, onClick }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Insights & Analytics</Typography>
          <Divider sx={{ mb: 2 }} />
          {data && data.length > 0 ? (
            <List>
              {data.map((item, idx) => {
                const isPositiveUp = item.change.startsWith('+') && !['Support tickets', 'Time to resolution'].includes(item.metric);
                const isPositiveDown = item.change.startsWith('-') && ['Support tickets', 'Time to resolution'].includes(item.metric);
                const positive = isPositiveUp || isPositiveDown;
                return (
                  <ListItem key={idx} sx={{ py: 1 }}>
                    <ListItemText primary={item.metric} secondary={item.value} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.change.startsWith('+') ? (
                        <TrendingUpIcon color={positive ? 'success' : 'error'} sx={{ mr: 1 }} />
                      ) : (
                        <TrendingDownIcon color={positive ? 'success' : 'error'} sx={{ mr: 1 }} />
                      )}
                      <Typography variant="body2" color={positive ? 'success.main' : 'error.main'}>{item.change}</Typography>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
              <Typography variant="body1" color="text.secondary">No insights data available</Typography>
            </Box>
          )}
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>Click to view detailed analytics</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default InsightsCard;