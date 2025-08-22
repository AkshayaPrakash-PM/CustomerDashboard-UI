import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box, Divider } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const ICMSeverityCard = ({ data, onClick }) => {
  const chartData = [
    { severity: 'Sev 1', count: data?.['Sev 1'] || 0 },
    { severity: 'Sev 2', count: data?.['Sev 2'] || 0 },
    { severity: 'Sev 3', count: data?.['Sev 3'] || 0 },
  ];
  const total = (data?.['Sev 1'] || 0) + (data?.['Sev 2'] || 0) + (data?.['Sev 3'] || 0);

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Active ICMs - S500 Customers</Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error">{data?.['Sev 1'] || 0}</Typography>
              <Typography variant="body2" color="text.secondary">Severity 1</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">{data?.['Sev 2'] || 0}</Typography>
              <Typography variant="body2" color="text.secondary">Severity 2</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">{data?.['Sev 3'] || 0}</Typography>
              <Typography variant="body2" color="text.secondary">Severity 3</Typography>
            </Box>
          </Box>
          <Box sx={{ height: 200, width: '100%' }}>
            {total > 0 ? (
              <BarChart
                xAxis={[{ scaleType: 'band', data: chartData.map(d => d.severity) }]}
                series={[{ data: chartData.map(d => d.count), barRadius: 4 }]}
                height={200}
                slotProps={{ legend: { hidden: true } }}
              />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="body1" color="text.secondary">No ICM data available</Typography>
              </Box>
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">Total Active ICMs: {total}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ICMSeverityCard;