import React from 'react';
import { AppBar, Toolbar, Typography, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';

const Navbar = () => {
  return (
    <header className="App-header">
      <AppBar className="App-Bar">
        <Toolbar>
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
            USERS LIST APP
          </Typography>
          <Stack direction='row' spacing={5}>
            <NavLink to='/users' className="linkStyle">Users List</NavLink>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: "secondary.light" }}/>
            <NavLink to='/community' className="linkStyle">Community</NavLink>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: "secondary.light" }}/>
            <NavLink to='/new-user' className="linkStyle">Add user</NavLink>
          </Stack>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Navbar;
