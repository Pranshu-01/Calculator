import { Box,Button,styled } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/features/userRedux'
import { logoutUser } from '../redux/features/historyRedux'

const Container=styled(Box)`
`

const Wrapper=styled(Box)``

const RightWrapper=styled(Box)`
    display: flex;
    flex-direction: column;
`

const RightButton=styled(Button)(({theme})=>({
    fontFamily: "'Lexend', sans-serif",
    padding: "6px 30px",
    boxShadow: "none",
    width:"100%",
    textTransform: "none",
    border: "0.1px solid #0056b3",
    fontSize: "16px",
    transition: "0.5s ease",
    "&:hover":{
        backgroundColor: "#0056b3",
        color: "#ffffff",
    }
}))


const DrawerButtons = () => {

    const user=useSelector((state)=>state.user.currentUser);

    const dispatch=useDispatch();

  return (
    <>
        <Container>
            <Wrapper>
            <RightWrapper>
                        <Link to="/login">
                            {!user && <RightButton size='medium' disableRipple variant='outlined'>Sign in</RightButton>}
                        </Link>

                        <Link to="/register">
                            {!user && <RightButton size='medium' style={{marginTop:"10px"}} disableRipple disableElevation variant='contained'>Register</RightButton>}
                        </Link>

                        <Link onClick={()=>{dispatch(logout());dispatch(logoutUser())}}>
                            {user && <RightButton size='medium' disableRipple disableElevation variant='contained'>Logout</RightButton>}
                        </Link>
                </RightWrapper>
            </Wrapper>
        </Container>
    </>
  )
}

export default DrawerButtons