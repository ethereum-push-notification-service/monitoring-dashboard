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
      url: `${urls.SHOWRUNNERS_URL}/monitoring/getnotificationbydate`,
      body: {query: {date: {$gte: 1658790000000, $lte: 1658790000000}}},
    },
    {
      type: 'PING',
      name: 'Push Nodes',
      url: `${urls.BACKEND_URL}/channels/fetch_channels`,
      body: {
        pageSize: 10,
        page: 1,
        op: 'write',
      },
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
          {HEALTH_SERVICES.map((oneService) => {
            return <HealthItem service={oneService} />;
          })}
        </Grid>
      </Container>
    </Layout>
  );
}

const HealthItem = ({ service }) => {
  const { type, name, url, body } = service;
  // error, warning, info, error
  const [status, setStatus] = useState('info');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    axios
      .post(url, { ...body })
      .then((res) => {
        // console.log({ res });
        setStatus('success')
      })
      .catch((err) => {
        // console.log(err);
        setStatus('error')
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
