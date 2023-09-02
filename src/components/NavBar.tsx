import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PersonIcon from '@mui/icons-material/Person';

const options = ['Log In', 'Profile', 'Flight Search', 'Saved Flights'];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        borderBottom: '4px solid black',
        borderImageSlice: 1,
        borderImageSource: "linear-gradient(to left, fuchsia, orange)",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Box width={40} height={40}></Box>
          <Container 
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FlightTakeoffIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'system-ui',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              WINGMAN
            </Typography>
          </Container>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Pages">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="A" src="" sx={{bgcolor: 'orange'}}>
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {options.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;