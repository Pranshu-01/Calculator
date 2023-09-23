import { Alert, Box, Collapse, IconButton, Typography, styled, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Delete, RestartAlt} from '@mui/icons-material';
import { deleteCalculation } from '../redux/features/historyRedux';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';


const Container=styled(Box)`
`

const Wrapper=styled(Box)``

const HeadingWrapper=styled(Box)`
    display: flex;
    color:#0056b3;
    font-size:24px;
`

const Heading=styled(Box)(({theme})=>({
    fontSize: "24px",
    color: "#0056b3",
    fontWeight: "500",
    marginBottom: "15px",
    [theme.breakpoints.down('md')]:{
        marginTop:"20px"
    }
}))
   
const HistoryIconWrapper=styled(HistoryIcon)(({theme})=>({
    [theme.breakpoints.down('md')]:{
        marginTop:"20px"
    }
}))




const Table=styled('table')({
    
    border:"1px solid #0056b3",
    color: "#000",
    width:"100%",
    borderRadius:"4px",
    padding:"0px 10px",
    backgroundColor:"#ffffff",
})

const Tr=styled('tr')({
    // color:"#0056b3"
})

const Td=styled('td')({
    borderRadius:"2px",
    padding:"0px 5px"
})

const AlertBox=styled(Box)(({theme})=>({
    width: "100%",
    [theme.breakpoints.down('lg')]:{
        marginTop:"40px"
    }
}))

const AlertText=styled(Box)``

const Text=styled(Box)(({theme})=>({
    fontSize: "14px",
    color: "#111111",
    [theme.breakpoints.down('md')]:{
        fontSize:"10px"
    }
}))
    


const History = ({setInputValue,setName}) => {

    const Mobile = useMediaQuery('(min-width:700px)');

    const user=useSelector((state)=>state.user.currentUser);

    const [open,setOpen]=useState(true);

    const dispatch=useDispatch();
    const history=useSelector((state)=>state.history);

    const handleRecalculate=(item)=>{
        setInputValue(item.inputValue);
        setName(item.name)
    }



  return (
    <>
        <Container>
                <Wrapper>

                {!user && (<AlertBox sx={{ width: '100%' }}>
                    <Collapse in={open} >
                        <Alert
                        style={{borderRadius:"4px",background:"#caf0f847"}}
                        icon={false}
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" style={{color:"#111111"}} />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >
                        <AlertText>
                            <Text>Want to access your calculations across different devices? <Link to="/login" style={{marginLeft:"2px",color:"#0056b3"}}>Sign in</Link></Text>
                            <Text style={{marginTop:"5px"}}>Don't have an account? <Link to="/register" style={{marginLeft:"2px",color:"#0056b3"}}>Register</Link></Text>
                        </AlertText>
                        </Alert>
                    </Collapse>
                </AlertBox>)}

                <HeadingWrapper>
                    <Heading>History</Heading>
                    <HistoryIconWrapper style={{fontSize:"29px",marginLeft:"4px"}}/>
                </HeadingWrapper>

                {Mobile ? <Table cellSpacing="10">
                    <Tr style={{color:"#367bee",fontWeight:"500",fontSize:"18px"}}>
                        <Td style={{}}>Name</Td>
                        <Td>Calculation</Td>
                        <Td>Result</Td>
                        <Td>Re-Calculate</Td>
                        <Td style={{}}>Delete</Td>
                    </Tr>
                    
                    {
                        history.calculations.map((item)=>{
                            let lastChar=item.inputValue.charAt(item.inputValue.length-1);
                            // console.log(lastChar)
                            let x=0;
                            let negative="";
                            while(item.inputValue.charAt(x)==='0'){
                                x++;
                            }
                            if(item.inputValue.charAt(x)==='/' || item.inputValue.charAt(x)==='*' || item.inputValue.charAt(x)==='+'){
                                x++;
                            }
                            else if(item.inputValue.charAt(x)==="-"){
                                negative="-";
                                x++;
                            }
                            return(
                                <>
                                    <Tr style={{fontSize:"17px",backgroundColor:"lightblue",color:"#000"}}>
                                        {item.name===""?<Td style={{}}>--------</Td> : <Td style={{}}>{item.name}</Td>}
                                        <Td>{item.inputValue}</Td>
                                        {/* {item.inputValue.charAt(0)==="0" ? <Td>{eval(item.inputValue.slice(1))}</Td> : <Td>{eval(item.inputValue)}</Td>} */}
                                        

                                       
                                        {
                                        (lastChar==='.' || lastChar==='/' || lastChar==='*' || lastChar==='-' || lastChar==='+') ? <Td>Invalid Operation</Td>  
                                        : 
                                        item.inputValue.charAt(0)==="0" ? <Td>{negative + eval(item.inputValue.slice(x))}</Td> : <Td>{eval(item.inputValue)}</Td>
                                        }

                                        <Td style={{cursor:"pointer"}}><RestartAlt onClick={()=>handleRecalculate(item)}/></Td>
                                        <Td style={{cursor:"pointer"}}><Delete onClick={()=>dispatch(deleteCalculation(item))}/></Td>
                                    </Tr>
                                </>
                            )
                        })
                    }
                </Table> 
                : 
                <Table cellSpacing="5">
                    <Tr style={{color:"#367bee",fontWeight:"500",fontSize:"10px"}}>
                        <Td style={{}}>Name</Td>
                        <Td>Calculation</Td>
                        <Td>Result</Td>
                        <Td>Re-Calculate</Td>
                        <Td style={{}}>Delete</Td>
                    </Tr>
                    
                    {
                        history.calculations.map((item)=>{
                            let lastChar=item.inputValue.charAt(item.inputValue.length-1);
                            // console.log(lastChar)
                            let x=0;
                            let negative="";
                            while(item.inputValue.charAt(x)==='0'){
                                x++;
                            }
                            if(item.inputValue.charAt(x)==='/' || item.inputValue.charAt(x)==='*' || item.inputValue.charAt(x)==='+'){
                                x++;
                            }
                            else if(item.inputValue.charAt(x)==="-"){
                                negative="-";
                                x++;
                            }
                            
                            return(
                                <>
                                    <Tr style={{fontSize:"10px",backgroundColor:"lightblue",color:"#000"}}>
                                        {item.name===""?<Td style={{}}>--------</Td> : <Td style={{}}>{item.name}</Td>}
                                        <Td>{item.inputValue}</Td>
                                        {/* {item.inputValue.charAt(0)==="0" ? <Td>{eval(item.inputValue.slice(1))}</Td> : <Td>{eval(item.inputValue)}</Td>} */}
                                        
                                        {
                                        (lastChar==='.' || lastChar==='/' || lastChar==='*' || lastChar==='-' || lastChar==='+') ? <Td>Invalid Operation</Td>  
                                        : 
                                        item.inputValue.charAt(0)==="0" ? <Td>{negative + eval(item.inputValue.slice(x))}</Td> : <Td>{eval(item.inputValue)}</Td>
                                        }

                                        <Td style={{cursor:"pointer"}}><RestartAlt style={{fontSize:"10px"}} onClick={()=>handleRecalculate(item)}/></Td>
                                        <Td style={{cursor:"pointer"}}><Delete style={{fontSize:"10px"}} onClick={()=>dispatch(deleteCalculation(item))}/></Td>
                                    </Tr>
                                </>
                            )
                        })
                    }
                </Table>

                }

                
             </Wrapper>
        </Container>
    </>
  )
}

export default History