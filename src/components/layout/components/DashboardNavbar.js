import { Box, IconButton, Avatar } from '@mui/material';
import Iconify from 'components/iconify';
import account from '_mock/account';
import Logo from 'components/logo';

import { RootStyle, ToolbarStyle } from './styled';

const Navbar = ({ onOpenSidebar }) => (
  <RootStyle>
    <ToolbarStyle>
      <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
        <Iconify icon="eva:menu-2-fill" />
      </IconButton>

      <Logo src="/static/home-logo.svg" sx={{ width: 140, height: 120 }} />

      <Box sx={{ flexGrow: 1 }} />

      <IconButton
        sx={{
          p: 0,
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>
    </ToolbarStyle>
  </RootStyle>
);

export default Navbar;
