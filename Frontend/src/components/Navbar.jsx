import React, { useState } from 'react'
import {Box,Button,Drawer,IconButton,styled} from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/features/userRedux'
import { logoutUser } from '../redux/features/historyRedux'
import { MenuSharp } from '@mui/icons-material'
import DrawerButtons from './DrawerButtons'


const Container=styled(Box)(({theme})=>({
    height: "55px",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 60px",
    color:"#0056b3",
    fontSize: "24px",
    [theme.breakpoints.down('md')]:{
        padding:"10px 20px"
    }
}))


const Left=styled(Box)`
    font-weight: 500;
`

const Right=styled(Box)``

const RightWrapper=styled(Box)`
    display: flex;
`

const RightButton=styled(Button)(({theme})=>({
    fontFamily: "'Lexend', sans-serif",
    padding: "6px 30px",
    boxShadow: "none",
    textTransform: "none",
    border: "0.1px solid #0056b3",
    fontSize: "16px",
    transition: "0.5s ease",
    "&:hover":{
        backgroundColor: "#0056b3",
        color: "#ffffff",
    },
    [theme.breakpoints.down('md')]:{
        display:"none"
    }
}))
    
const MenuButton=styled(IconButton)(({theme})=>({
    display:"none",
    [theme.breakpoints.down('md')]:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
}))

const DrawerWrapper=styled(Box)`
    background: #ffffff;
    padding: 60px 40px;
`



const Navbar = () => {

    const user=useSelector((state)=>state.user.currentUser);

    const dispatch=useDispatch();

    const [open,setOpen]=useState(false);

    const openDrawer=()=>{
        setOpen(true);
    }

    const closeDrawer=()=>{
        setOpen(false);
    }

  return (
    <>
        <Container>
                <Left>
                    <Link to="/" style={{textDecoration:"none",color:"inherit"}}>Calculator</Link>
                </Left>
                <Right>
                    <RightWrapper>
                        <Link to="/login" style={{textDecoration:"none",color:"inherit"}}>
                            {!user && <RightButton size='medium' disableRipple style={{marginRight:"20px"}} variant='outlined'>Sign in</RightButton>}
                        </Link>

                        <Link to="/register" style={{textDecoration:"none",color:"inherit"}}>
                            {!user && <RightButton size='medium' disableRipple disableElevation variant='contained'>Register</RightButton>}
                        </Link>

                        <Link onClick={()=>{dispatch(logout());dispatch(logoutUser())}} style={{textDecoration:"none",color:"inherit"}}>
                            {user && <RightButton size='medium' disableRipple disableElevation variant='contained'>Logout</RightButton>}
                        </Link>
                    </RightWrapper>
                        <MenuButton onClick={openDrawer}>
                            <MenuSharp style={{fontSize:"25px",color:"#000"}}/>
                        </MenuButton>
                    <Drawer open={open} onClose={closeDrawer} anchor='right'>
                        <Box onClick={closeDrawer}>
                            <DrawerWrapper>
                                <DrawerButtons/>
                            </DrawerWrapper>
                        </Box>
                    </Drawer>
                </Right>
        </Container>
    </>
  )
}

export default Navbar