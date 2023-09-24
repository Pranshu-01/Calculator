import { Box, Button, InputBase, styled } from '@mui/material'
import React, { useState } from 'react'
import History from './History'
import { useDispatch, useSelector } from 'react-redux'
import { addCalculation } from '../redux/features/historyRedux'
import uniqid from 'uniqid';


const Container=styled(Box)(({theme})=>({
    padding: "60px 60px",
    [theme.breakpoints.down('md')]:{
        padding:"60px 10px"
    }
}))


const Wrapper=styled(Box)(({theme})=>({
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down('lg')]:{
        flexDirection:"column"
    }
}))
    


const Left=styled(Box)`
    flex: 1;
`

const LeftWrapper=styled(Box)`
`

const InputBaseWrapper=styled(InputBase)`
    border: 1px solid #ffffff;
    color:#ffffff;
    padding: 0px 10px;
    width: 100%;
    border-radius: 2px;

`



const Table=styled('table')(({theme})=>({
    border:"1px solid #0056b3",
    width:"95%",
    height:"500px",
    borderRadius:"10px",
    padding:"10px 10px",
    backgroundColor:"#0056b3",
    // boxShadow:"0px 20px 20px 0px #eee"
    [theme.breakpoints.down('lg')]:{
        width:"100%"
    }
}))

const CalButton=styled(Button)`
    background-color: #ffffff;
    color: #000;
    font-size: 20px;
    width: 100%;
    box-shadow: none;
    &:hover{
        color:#ffffff;
    }
`

const NameWrapper=styled(Box)`
    margin-top: 40px;
`

const Heading=styled(Box)`
    font-size: 20px;
    color: #0056b3;
    font-weight: 500;
    margin-bottom: 10px;
`

const InputWrapper=styled(Box)(({theme})=>({
    display: "flex",
    justifyContent: "space-between",
    border:"0.1px solid #0056b3",
    borderRadius: "2px",
    width: "95%",
    [theme.breakpoints.down('lg')]:{
        width:"40%"
    },
    [theme.breakpoints.down('sm')]:{
        width:"100%"
    }
}))
    


const InputBaseSave=styled(InputBase)`
    padding: 0px 10px;
    width: 100%;
    color:#000;
    /* border-radius: 2px; */
`

const SaveButton=styled(Button)`
    border-radius: 0px;
    box-shadow: none;
    background-color: #0056b3;
    text-transform: none;
    font-size: 16px;
`

const Right=styled(Box)(({theme})=>({
    flex:"2",
    marginLeft:"80px",
    [theme.breakpoints.down('lg')]:{
        marginLeft:"0px"
    }
}))


const Calculator = () => {
    const dispatch=useDispatch();

    const [name,setName]=useState('');

    const [inputValue,setInputValue]=useState('');
    const [neg,setNeg]=useState(false);



    const user=useSelector((state)=>state.user.currentUser);

    const [data,setData]=useState({
        userId:"",
        id:"",
        name:"",
        inputValue:""
    })


    const handleClick=(e)=>{
        if(inputValue==="Invalid Operation"){
            setInputValue(e.target.value);
        }
        
        else if(inputValue.toString().charAt(0)==="0"){
            setInputValue(e.target.value);
        }
        else if((inputValue.toString().charAt(0)==="/" || inputValue.toString().charAt(0)==="*" || inputValue.toString().charAt(0)==="+" || inputValue.toString().charAt(0)==="-") && inputValue.toString().charAt(1)==="0"){
            setInputValue(inputValue.slice(0,1)+e.target.value);
        }
        else if((inputValue.toString().charAt(inputValue.length-1)==="/" || inputValue.toString().charAt(inputValue.length-1)==="*" || inputValue.toString().charAt(inputValue.length-1)==="+" || inputValue.toString().charAt(inputValue.length-1)==="-" || inputValue.toString().charAt(inputValue.length-1)===".")){
            if(e.target.value==="1" || e.target.value==="2" || e.target.value==="3" || e.target.value==="4" || e.target.value==="5" || e.target.value==="6" || e.target.value==="7" || e.target.value==="8" || e.target.value==="9" || e.target.value==="0" ){
                setInputValue(inputValue + e.target.value);
            }
            else if(e.target.value==="00"){
                setInputValue(inputValue + e.target.value.slice(0,-1));
            }
            else{
                setInputValue(inputValue.slice(0,-1)+e.target.value);
            }
        }
        else if(inputValue.toString().charAt(inputValue.length-1)==="0" && (inputValue.toString().charAt(inputValue.length-2)==="/" || inputValue.toString().charAt(inputValue.length-2)==="*" || inputValue.toString().charAt(inputValue.length-2)==="+" || inputValue.toString().charAt(inputValue.length-2)==="-")){
            if(e.target.value==="0" || e.target.value==="00"){

            }
            else if(e.target.value==="*" || e.target.value==="/" || e.target.value==="+" || e.target.value==="-" || e.target.value==="."){
                setInputValue(inputValue+e.target.value);
            }
            else{
                setInputValue(inputValue.slice(0,-1) + e.target.value);
            }
        }
        else{
            setInputValue(inputValue + e.target.value);
        }
    }



    const handleResult=async()=>{
       
        
        if(inputValue==="" || inputValue==="0" || inputValue==="/" || inputValue==="*" || inputValue==="+" || inputValue==="-" || inputValue==="."){

        }
        else if(inputValue==="00"){
            setInputValue(inputValue.slice(0,-1));
        }
        else{
        try{
            let id=uniqid();
            dispatch(addCalculation({id,name,inputValue}));
            setInputValue(eval(inputValue));
            setName('');
        }
        catch(e){
            setInputValue('Invalid Operation');
            setName('');
        }
    }
    }

    const handleDel=()=>{
        if(inputValue==="Invalid Operation"){

        }
        else{
            setInputValue(inputValue.toString().slice(0,-1));
        }
    }

  return (
    <>
        <Container>
            <Wrapper>
                <Left>
                    <LeftWrapper>
                        <Table cellSpacing="10">
                            <tr>
                                <td colSpan="4">
                                    <InputBaseWrapper placeholder='0' readOnly value={inputValue}/>
                                </td>
                            </tr>
                            <tr>
                                <td><CalButton onClick={()=>setInputValue('')} variant='contained'>AC</CalButton></td>
                                <td><CalButton onClick={handleDel} variant='contained'>DEL</CalButton></td>
                                <td><CalButton onClick={handleClick} value="." variant='contained'>.</CalButton></td>
                                <td><CalButton onClick={handleClick} value="/" variant='contained'>÷</CalButton></td>
                            </tr>
                            <tr>
                                <td><CalButton onClick={handleClick} value="7" variant='contained'>7</CalButton></td>
                                <td><CalButton onClick={handleClick} value="8" variant='contained'>8</CalButton></td>
                                <td><CalButton onClick={handleClick} value="9" variant='contained'>9</CalButton></td>
                                <td><CalButton onClick={handleClick} value="*" variant='contained'>×</CalButton></td>
                            </tr>

                            <tr>
                                <td><CalButton onClick={handleClick} value="4" variant='contained'>4</CalButton></td>
                                <td><CalButton onClick={handleClick} value="5" variant='contained'>5</CalButton></td>
                                <td><CalButton onClick={handleClick} value="6" variant='contained'>6</CalButton></td>
                                <td><CalButton onClick={handleClick} value="-" variant='contained'>-</CalButton></td>
                            </tr>

                            <tr>
                                <td><CalButton onClick={handleClick} value="1" variant='contained'>1</CalButton></td>
                                <td><CalButton onClick={handleClick} value="2" variant='contained'>2</CalButton></td>
                                <td><CalButton onClick={handleClick} value="3" variant='contained'>3</CalButton></td>
                                <td><CalButton onClick={handleClick} value="+" variant='contained'>+</CalButton></td>
                            </tr>

                            <tr>
                                <td><CalButton onClick={handleClick} value="00" variant='contained'>00</CalButton></td>
                                <td><CalButton onClick={handleClick} value="0" variant='contained'>0</CalButton></td>
                                <td colSpan="2"><CalButton onClick={()=>handleResult()} style={{width:"100%",backgroundColor:"#48cae4",color:"#000"}} variant='contained'>=</CalButton></td>
                            </tr>
                        </Table>
                        
                        <NameWrapper>
                            <Heading>Calculation Name</Heading>
                            <InputWrapper>
                                <InputBaseSave value={name} inputProps={{maxLength:"10"}} onChange={(e)=>setName(e.target.value)}/>
                                {/* <SaveButton disableElevation disableRipple variant='contained'>Save</SaveButton> */}
                            </InputWrapper>
                        </NameWrapper>
                    </LeftWrapper>
                </Left>
                <Right>
                    <History setInputValue={setInputValue} setName={setName}/>
                </Right>
            </Wrapper>
        </Container>
    </>
  )
}

export default Calculator