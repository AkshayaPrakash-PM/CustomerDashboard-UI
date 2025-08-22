import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Divider, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { LineChart } from '@mui/x-charts/LineChart';

const DetailView = ({ type, data, onClose }) => {
  const [activeTab, setActiveTab] = React.useState('S500');
  const [activeMetric, setActiveMetric] = React.useState('userSatisfaction');

  const getTitle = () => {
    switch (type) {
      case 'segments':
        return 'Customer Segments';
      case 'concerns':
        return 'S500 Customer Concerns';
      case 'feedback':
        return 'S500 Customer Positive Feedback';
      case 'icm':
        return 'Active ICMs for S500 Customers';
      case 'insights':
        return 'Insights & Analytics';
      default:
        return 'Detail View';
    }
  };

  const renderSegmentsDetail = () => {
    const segments = ['S500', 'Major', 'SMB'];
    const currentData = data?.[activeTab] || [];
    
    const columns = [
      { field: 'customerName', headerName: 'Customer Name', width: 200 },
      { field: 'tenantId', headerName: 'Tenant ID', width: 250 },
      { field: 'product', headerName: 'Product', width: 200 },
      { field: 'subscriptionType', headerName: 'Subscription Type', width: 180 },
    ];

    return (
      <Box>
        <Box sx={{ mb: 2 }}>
          {segments.map(segment => (
            <Button
              key={segment}
              variant={activeTab === segment ? 'contained' : 'outlined'}
              onClick={() => setActiveTab(segment)}
              sx={{ mr: 1, mb: 1 }}
            >
              {segment} ({data?.[segment]?.length || 0})
            </Button>
          ))}
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={currentData.map((item, idx) => ({ id: idx, ...item }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
        </Box>
      </Box>
    );
  };

  const renderConcernsDetail = () => {
    const columns = [
      { field: 'customerName', headerName: 'Customer Name', width: 150 },
      { field: 'tenantId', headerName: 'Tenant ID', width: 200 },
      { field: 'concern', headerName: 'Concern Description', width: 300, flex: 1 },
      { field: 'status', headerName: 'Status', width: 120 },
      { field: 'dateReported', headerName: 'Date Reported', width: 130 },
    ];

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data?.map((item, idx) => ({ id: idx, ...item })) || []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </Box>
    );
  };

  const renderFeedbackDetail = () => {
    const columns = [
      { field: 'customerName', headerName: 'Customer Name', width: 150 },
      { field: 'tenantId', headerName: 'Tenant ID', width: 200 },
      { field: 'feedback', headerName: 'Feedback Description', width: 300, flex: 1 },
      { field: 'sentimentScore', headerName: 'Sentiment Score', width: 130 },
      { field: 'dateReceived', headerName: 'Date Received', width: 130 },
    ];

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data?.map((item, idx) => ({ id: idx, ...item })) || []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </Box>
    );
  };

  const renderIcmDetail = () => {
    const columns = [
      { field: 'icmId', headerName: 'ICM ID', width: 120 },
      { field: 'customerName', headerName: 'Customer Name', width: 150 },
      { field: 'tenantId', headerName: 'Tenant ID', width: 200 },
      { field: 'description', headerName: 'Issue Description', width: 250, flex: 1 },
      { field: 'severity', headerName: 'Severity', width: 100 },
      { field: 'openDate', headerName: 'Open Date', width: 120 },
      { field: 'durationOpen', headerName: 'Duration Open', width: 130 },
    ];

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data?.map((item, idx) => ({ id: idx, ...item })) || []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </Box>
    );
  };

  const renderInsightsDetail = () => {
    const metrics = [
      { key: 'userSatisfaction', label: 'User Satisfaction' },
      { key: 'adoption', label: 'Adoption Rate' },
      { key: 'supportTickets', label: 'Support Tickets' },
      { key: 'timeToResolution', label: 'Time to Resolution' },
    ];

    const chartData = data?.[activeMetric] || [];

    return (
      <Box>
        <Box sx={{ mb: 2 }}>
          {metrics.map(metric => (
            <Button
              key={metric.key}
              variant={activeMetric === metric.key ? 'contained' : 'outlined'}
              onClick={() => setActiveMetric(metric.key)}
              sx={{ mr: 1, mb: 1 }}
            >
              {metric.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <LineChart
            xAxis={[{ scaleType: 'point', data: chartData.map(d => d.month) }]}
            series={[{
              data: chartData.map(d => d.value),
              label: metrics.find(m => m.key === activeMetric)?.label,
            }]}
            height={400}
          />
        </Box>
      </Box>
    );
  };

  const renderContent = () => {
    switch (type) {
      case 'segments':
        return renderSegmentsDetail();
      case 'concerns':
        return renderConcernsDetail();
      case 'feedback':
        return renderFeedbackDetail();
      case 'icm':
        return renderIcmDetail();
      case 'insights':
        return renderInsightsDetail();
      default:
        return <Typography>No data available</Typography>;
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{getTitle()}</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default DetailView;