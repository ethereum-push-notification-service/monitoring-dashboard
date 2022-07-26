import { Helmet } from 'react-helmet-async';
import { forwardRef, useState } from 'react';
import Box from '@mui/material/Box';
import { DashboardNavbar, DashboardSidebar } from './components';

import { MainStyle, RootStyle } from './styled';

const Layout = forwardRef(({ children, title = '', meta, ...other }, ref) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Helmet>
        <title>{`${title} | EPNS`}</title>
        {meta}
      </Helmet>

      <RootStyle>
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle>
          <Box ref={ref} {...other}>
            {children}
          </Box>
        </MainStyle>
      </RootStyle>
    </Box>
  );
});

export default Layout;
