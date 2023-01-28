import Layout from 'components/layout';
import Alert from '@mui/material/Alert';
import urls from 'settings';
import { Grid, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Health() {
  const HEALTH_SERVICES = [
    {
      type: 'PING',
      name: 'Showrunners',
      method: 'post',
      url: `${urls.SHOWRUNNERS_URL}/analytics/querylog`,
      body: { filter: { date: { $gte: 1658790000000, $lte: 1658790000000 } } },
    },
    {
      type: 'PING',
      name: 'Push Nodes',
      method: 'get',
      url: `${urls.BACKEND_URL}/channels/search?page=1&limit=30&order=desc&query=io`,
    },
  ];

  return (
    <Layout title="health">
      <Container maxWidth="xl" sx={{ minHeight: '80vh' }}>
        <Grid container spacing={3} sx={{ mt: 1, mb: 7 }}>
          <Grid item xs={9}>
            <Typography variant="h4">Services Health Check</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {HEALTH_SERVICES.map((oneService, index) => (
            <HealthItem key={index} service={oneService} />
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}

const HealthItem = ({ service }) => {
  const { type, name, url, body, method } = service;
  // error, warning, info, error
  const [status, setStatus] = useState('info');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    const axiosPromise = method === 'post' ? axios.post(url, { ...body }) : axios.get(url);
    axiosPromise
      .then((res) => {
        console.log({ res });
        setStatus('success');
      })
      .catch((err) => {
        console.log(err);
        setStatus('error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);
  return (
    <Grid item xs={12}>
      <Alert severity={status}>{loading ? `Pinging the ${name} service` : name}</Alert>
    </Grid>
  );
};
