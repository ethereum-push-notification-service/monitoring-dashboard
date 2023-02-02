import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import urls from 'settings';
import { Grid, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Table from 'components/table';
import Layout from 'components/layout';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAllChannels } from 'utils/functions';
import { AppWidgetSummary } from './components';

const DEFAULT_STATE = {
  totalChannels: 0,
  triggeredChannels: 0,
  totalNotifications: 0,
};

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [data, setData] = useState([]);
  const [done, setDone] = useState(false);
  const [summary, setSummary] = useState(DEFAULT_STATE);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState(null);
  const [allChannels, setAllChannels] = useState([]);

  const handleChange = (event) => {
    setChannel(event.target.value);
  };

  useEffect(() => {
    const start = +moment(selectedDate).startOf('day').format('X') * 1000;
    const endDate = +moment(selectedDate).endOf('day').format('X') * 1000;
    // fetch the data from the backend
    setDone(false);
    setLoading(true);

    axios
      .post(`${urls.SHOWRUNNERS_URL}/analytics/querylog`, {
        filter: { startedAt: { $gte: start, $lte: endDate } },
      })
      .then(({ data: response }) => {
        setData(response);
      })
      .finally(() => {
        setDone(true);
        setLoading(false);
      });
  }, [selectedDate]);

  useEffect(() => {
    console.log({ data });
    const uniqueChannelsTriggered = [...new Set(data.map(({ channelAddress }) => channelAddress))];
    const totalNotificationsSent = data.reduce((a, b) => a + b.sentNotificationCount, 0);
    setAllChannels([...new Set(data.map(({ channelName }) => channelName))]);
    setSummary({
      totalChannels: 0,
      triggeredChannels: uniqueChannelsTriggered.length,
      totalNotifications: totalNotificationsSent,
    });
  }, [data, done]);

  useEffect(() => {
    (async () => {
      const allChannels = await getAllChannels();
      setSummary((s) => ({
        ...s,
        totalChannels: allChannels.length,
      }));
    })();
  }, []);

  return (
    <Layout title="Dashboard">
      <Backdrop
        sx={{
          color: '#fff',
          background: 'rgba(0,0,0,0.85);',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </Backdrop>
      <Container maxWidth="xl">
        <Grid container spacing={3} sx={{ mt: 1, mb: 7 }}>
          <Grid item xs={9}>
            <Typography variant="h4">Daily Stats</Typography>
          </Grid>

          <Grid item xs={3}>
            <TextField
              id="date"
              label="date filter"
              value={selectedDate}
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Notification(s) Sent"
              total={summary.totalNotifications}
              icon={'ant-design:bell-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Channel(s) triggered"
              total={summary.triggeredChannels}
              color="warning"
              icon={'ant-design:bell-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Channels"
              total={summary.totalChannels}
              color="error"
              icon={'ant-design:user-outlined'}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid container spacing={3} sx={{ mt: 9, mb: 2 }}>
            <Grid item xs={9}>
              <Typography variant="h4">Channel Breakdown</Typography>
            </Grid>

            <Grid item xs={3}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Channel</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={channel}
                    label="Channel"
                    onChange={handleChange}
                  >
                    {allChannels.map((oneChannel, i) => (
                      <MenuItem key={i} value={oneChannel}>
                        {oneChannel}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Grid item sx={{ mt: 4 }} xs={12} md={12} lg={12}>
            <Table data={!channel ? data : data.filter(({ channelName }) => channelName === channel)} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;
