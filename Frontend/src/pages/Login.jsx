import { Box, Button, InputBase, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../services/api'
import { Link } from 'react-router-dom'

const Container=styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;

`

const Wrapper=styled(Box)`
    margin: 60px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background-color: white; */
    border-radius: 6px;
    padding: 30px;
     box-shadow:0px 0px 20px 0px #eee;
`

const Heading=styled(Box)`
    font-size: 26px;
    color: #0056b3;
    font-weight: 500;
`

const Text=styled(Box)`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 300;
    color:#696969;
    font-size: 16px;
`

const Form=styled('form')`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    width:100%;
    // marginTop:"20px",
    padding:20px 40px;
`

const Input=styled(InputBase)`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 10px;
    margin: 10px 0px;
    width: 100%;
    border-radius: 2px;
    font-size: 15px;
`

const FormButton=styled('button')({
    background:"#0056b3",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    color:"#ffffff",
    width:"100%",
    padding:"10px 10px",
    margin:"20px 0px",
    letterSpacing:"0.5px",  
    // fontWeight:"600",
    border:"none",
    borderRadius:"4px",
    cursor:"pointer"
})

const Error=styled(Box)`
    width: 100%;
    color:#fe0000;
    font-size: 10px;
    /* font-weight: 500; */
`


const Login = () => {

    const dispatch=useDispatch();

    const {error}=useSelector((state)=>state.user);

    const [data,setData]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        console.log(data);
        e.preventDefault();
        await login(dispatch,data);
    }

  return (
   <>
    <Container>
        <Wrapper>
            <Heading>Sign in</Heading>
            <Text>Welcome, please login to your account</Text>
            <Form onSubmit={handleSubmit}>
                <Input type='email' name='email' placeholder='Email' onChange={handleChange} required/>
                <Input type='password' name='password' placeholder='Password' onChange={handleChange} required/>
                {error && <Error>Your email or password was entered incorrectly.</Error>}
                <FormButton>Sign in</FormButton>
                <Text style={{fontSize:"15px"}}>Don't have an account? <Link to="/register" style={{marginLeft:"5px",textDecoration:"underline",color:"#0056b3"}}>Register</Link></Text>
            </Form>
        </Wrapper>
    </Container>
   </>
  )
}

export default Login