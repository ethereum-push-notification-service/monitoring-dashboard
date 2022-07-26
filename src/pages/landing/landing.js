import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';
import Connect from 'components/connect';
import { ROUTES } from 'utils/constants';
import { ContentStyle } from './styled';

const Page404 = () => (
  <Container style={{ background: 'white' }}>
    <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
      <Typography variant="h3" paragraph>
        Sorry, Please connect your wallet to proceed!
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        Sorry, In order to grant you access to the dashboard we would need to authenticate you via your address. Be sure
        to connect with an authorized wallet.
      </Typography>

      <Box component="img" src="/static/epnsbell.jpeg" sx={{ height: 150, mx: 'auto', my: { xs: 5, sm: 10 } }} />

      <Connect />
    </ContentStyle>
  </Container>
);

export default Page404;
