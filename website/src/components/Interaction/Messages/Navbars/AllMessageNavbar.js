import React from "react";
import { Button, Typography } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import GestureIcon from '@mui/icons-material/Gesture';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import LogoutIcon from '@mui/icons-material/Logout';
import Head from '../../../../Assets/head.png'
import MenuIcon from '@mui/icons-material/Menu';

const AllMessageNavbar = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    
    const menuId = 'primary-search-account-menu';
    // const renderMenu = (
    //     <Menu
    //     anchorEl={anchorEl}
    //     anchorOrigin={{
    //         vertical: 'top',
    //         horizontal: 'right',
    //     }}
    //     id={menuId}
    //     keepMounted
    //     transformOrigin={{
    //         vertical: 'top',
    //         horizontal: 'right',
    //     }}
    //     open={isMenuOpen}
    //     onClose={handleMenuClose}
    //     >
    //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    //     </Menu>
    // );
    
    const mobileMenuId = 'primary-search-account-menu-mobile';
    
    const renderMobileMenu = (
        <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        >
        <MenuItem fontSize="large" >
            <Button onClick={props.props.goToDiscussions}><WorkspacesIcon fontSize="large"/></Button>
        </MenuItem>
        <MenuItem>
            <Button onClick={props.props.goToInteractions}><GestureIcon fontSize="large" /></Button>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
            <Button onClick={props.props.logout}><LogoutIcon fontSize="large" /></Button>
        </MenuItem>
        </Menu>
    );

    return(
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx ={{background: "#0B816f"}} position="static">
                    <Toolbar>
                    <img src={Head} onClick={props.props.goToHome} style={{maxWidth: 50}}/>
                    <Box textAlign={"center"} sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button onClick={props.props.goToDiscussions}><WorkspacesIcon fontSize="large"/></Button>
                        <Button onClick={props.props.goToHome}><GestureIcon fontSize="large" /></Button>
                        <Button onClick={props.props.logout}><LogoutIcon fontSize="large" /></Button>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"                    
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                    </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </Box>
    )
}

export default AllMessageNavbar;

