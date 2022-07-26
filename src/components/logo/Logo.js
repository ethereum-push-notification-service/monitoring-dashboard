import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';

export default function Logo({ disabledLink = false, sx, src = '/static/epns.png' }) {
  const logo = <Box component="img" src={src} sx={{ width: 40, height: 40, ...sx }} />;

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
