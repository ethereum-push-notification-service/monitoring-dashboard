import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import moment from 'moment';

const parseDateTime = (date) => moment(date).format('hh:mm:ss a');

export default function BasicTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Channel Name</TableCell>
            <TableCell align="right">Notification Triggered</TableCell>
            <TableCell align="right">Notification Sent</TableCell>
            <TableCell align="right">Job Time Start</TableCell>
            <TableCell align="right">Job Time End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={JSON.stringify(row)} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.channelName}
              </TableCell>
              <TableCell align="right">{row.notificationCount}</TableCell>
              <TableCell align="right">{row.notificationCount - row.failedNotificationCount}</TableCell>
              <TableCell align="right">{parseDateTime(row.date)}</TableCell>
              <TableCell align="right">{parseDateTime(row.endDateTime)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
