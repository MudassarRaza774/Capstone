import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import BlurOffIcon from '@mui/icons-material/BlurOff';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie'

const settings = ['Profile', 'Logout'];
function Navbar({ cartCount }) {

    const naviagte = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = async (event) => {
        const value = event.currentTarget.id
        if (value === 'Logout') {
            const result = await fetch('user/logout')
            if (result.status !== 200) {
                setAnchorElUser(null);
            } else {
                Cookie.set('token', '')
                sessionStorage.setItem('loggedInUser', '')
                sessionStorage.setItem('currentProduct', '')
                setAnchorElUser(null)
                naviagte("/login")
            }
        } else if (value === 'Profile') {
            naviagte('/userprofile')

        } else {
            setAnchorElUser(null)
        }

    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <BlurOffIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        OutClass
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu

                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Link to='/' style={{ textDecoration: "none" }} ><Button sx={{ my: 2, color: 'black', display: 'block' }}>Home</Button></Link>
                            {
                                sessionStorage.getItem('loggedInUser') ? null :
                                    <Link to='/login' style={{ textDecoration: "none" }} ><Button sx={{ my: 2, color: 'black', display: 'block' }}>Login</Button></Link>
                            }
                            {
                                sessionStorage.getItem('loggedInUser') ? null : <Link to='/signup' style={{ textDecoration: "none" }} ><Button sx={{ my: 2, color: 'black', display: 'block' }}>Signup</Button></Link>
                            }
                            <Link to='/contactus' style={{ textDecoration: "none" }} ><Button sx={{ my: 2, color: 'black', display: 'block' }}>contact Us</Button></Link>
                            <Link to='/aboutus' style={{ textDecoration: "none" }} ><Button sx={{ my: 2, color: 'black', display: 'block' }}>About Us</Button></Link>
                        </Menu>
                    </Box>
                    <BlurOffIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        OutClass
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link to='/' style={{ textDecoration: "none" }} ><Button sx={{ my: 2, color: 'black', display: 'block' }}>Home</Button></Link>
                        {
                            sessionStorage.getItem('loggedInUser') ? null :
                                <Link to='/login' style={{ textDecoration: "none" }} ><Button sx={{ my: 2, color: 'black', display: 'block' }}>Login</Button></Link>
                        }
                        {
                            sessionStorage.getItem('loggedInUser') ? null : <Link to='/signup' style={{ textDecoration: "none" }} ><Button sx={{ my: 2, color: 'black', display: 'block' }}>Signup</Button></Link>
                        }
                        <Link to='/contactus' style={{ textDecoration: "none" }} ><Button sx={{ my: 2, color: 'black', display: 'block' }}>contact Us</Button></Link>
                        <Link to='/aboutus' style={{ textDecoration: "none" }} ><Button sx={{ my: 2, color: 'black', display: 'block' }}>About Us</Button></Link>
                    </Box>
                    {
                        sessionStorage.getItem('loggedInUser') ? <Box>
                            <Link to='/cart'>
                                <Badge badgeContent={cartCount} color="primary" sx={{ mr: 1 }}>
                                    <ShoppingCartIcon color="action" />
                                </Badge>
                            </Link>
                        </Box> : null
                    }

                    <span>&nbsp;</span>
                    {
                        sessionStorage.getItem('loggedInUser') ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar ><PersonIcon /></Avatar>
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
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} id={setting} data-my-value={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box> : null
                    }
                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default Navbar