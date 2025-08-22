import React, { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import {
  Box,
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import CustomerSegmentCard from './components/CustomerSegmentCard';
import TopConcernsCard from './components/TopConcernsCard';
import PositiveFeedbackCard from './components/PositiveFeedbackCard';
import ICMSeverityCard from './components/ICMSeverityCard';
import InsightsCard from './components/InsightsCard';
import DetailView from './components/DetailView';
import { processData } from './utils/dataProcessing';

const CSV_PATH = '/data/combined_tenant_dashboard_source.csv';

function App() {
  const [product, setProduct] = useState('');
  const [rawRows, setRawRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detailView, setDetailView] = useState(null);

  useEffect(() => {
    setLoading(true);
    Papa.parse(CSV_PATH, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setRawRows(results.data || []);
        setLoading(false);
      },
      error: (err) => {
        setError(err?.message || 'Failed to load CSV');
        setLoading(false);
      },
    });
  }, []);

  const data = useMemo(() => {
    if (!product) return null;
    return processData(rawRows, product);
  }, [rawRows, product]);

  const handleProductChange = (event) => {
    setProduct(event.target.value);
    setDetailView(null);
  };

  const handleCardClick = (cardType, cardData) => {
    setDetailView({ type: cardType, data: cardData });
  };

  const handleCloseDetailView = () => setDetailView(null);

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Customer Dashboard
        </Typography>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="product-select-label">Select Product</InputLabel>
          <Select
            labelId="product-select-label"
            id="product-select"
            value={product}
            label="Select Product"
            onChange={handleProductChange}
          >
            <MenuItem value="">
              <em>Select a product</em>
            </MenuItem>
            <MenuItem value="Exchange Admin Center">Exchange Admin Center</MenuItem>
            <MenuItem value="Copilot Extensibility">Copilot Extensibility</MenuItem>
            <MenuItem value="Exchange Server">Exchange Server</MenuItem>
          </Select>
        </FormControl>

        {loading && (
          <Paper elevation={3} sx={{ p: 5, minHeight: '40vh' }}>
            <Typography>Loading data...</Typography>
          </Paper>
        )}

        {!loading && error && (
          <Paper elevation={3} sx={{ p: 5, minHeight: '40vh' }}>
            <Typography color="error">{error}</Typography>
          </Paper>
        )}

        {!loading && !error && (!product || !data) && (
          <Paper elevation={3} sx={{ p: 5, minHeight: '40vh' }}>
            <Typography variant="h5" color="text.secondary" align="center">
              Please select a product to view the dashboard
            </Typography>
          </Paper>
        )}

        {!loading && !error && product && data && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <CustomerSegmentCard
                data={data.segmentCounts}
                onClick={() => handleCardClick('segments', data.segmentDetails)}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TopConcernsCard
                data={data.topConcerns}
                onClick={() => handleCardClick('concerns', data.concernsDetails)}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PositiveFeedbackCard
                data={data.topPositive}
                onClick={() => handleCardClick('feedback', data.feedbackDetails)}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <ICMSeverityCard
                data={data.icmSeverity}
                onClick={() => handleCardClick('icm', data.icmDetails)}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InsightsCard
                data={data.insights}
                onClick={() => handleCardClick('insights', data.insightsDetails)}
              />
            </Grid>
          </Grid>
        )}

        {detailView && (
          <DetailView type={detailView.type} data={detailView.data} onClose={handleCloseDetailView} />
        )}
      </Box>
    </Container>
  );
}

export default App;