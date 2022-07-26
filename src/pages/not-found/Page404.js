import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';
import { ROUTES } from 'utils/constants';
import { ContentStyle } from './styled';

const Page404 = () => (
  <Container>
    <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
      <Typography variant="h3" paragraph>
        Sorry, page not found!
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
        spelling.
      </Typography>

      <Box
        component="img"
        src="/static/illustrations/illustration_404.svg"
        sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
      />

      <Button to={ROUTES.HOME} size="large" variant="contained" component={RouterLink}>
        Go to Home
      </Button>
    </ContentStyle>
  </Container>
);

export default Page404;
