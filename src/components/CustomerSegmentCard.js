import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box, Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const CustomerSegmentCard = ({ data, onClick }) => {
  const total = (data?.S500 || 0) + (data?.Major || 0) + (data?.SMB || 0);
  const pieData = [
    { id: 0, value: data?.S500 || 0, label: 'S500', color: '#2196f3' },
    { id: 1, value: data?.Major || 0, label: 'Major', color: '#4caf50' },
    { id: 2, value: data?.SMB || 0, label: 'SMB', color: '#ff9800' },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Customer Segment Overview</Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">{data?.S500 || 0}</Typography>
              <Typography variant="body2" color="text.secondary">S500</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">{data?.Major || 0}</Typography>
              <Typography variant="body2" color="text.secondary">Major</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">{data?.SMB || 0}</Typography>
              <Typography variant="body2" color="text.secondary">SMB</Typography>
            </Box>
          </Box>
          <Box sx={{ height: 200 }}>
            <PieChart
              series={[{ data: pieData, highlightScope: { faded: 'global', highlighted: 'item' }, faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' } }]}
              height={200}
              slotProps={{ legend: { hidden: true } }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">Total Customers: {total}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomerSegmentCard;