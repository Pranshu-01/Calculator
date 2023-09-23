import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from '../redux/features/userRedux';


const URL="http://localhost:8080/api";

export const register=async(data)=>{
    try{
        return axios.post(`${URL}/auth/register`,data);
    }
    catch(err){
        console.log('Error wile calling register api');
    }
}


export const login=async(dispatch,user)=>{
    dispatch(loginStart());

    try{
        const response=await axios.post(`${URL}/auth/login`,user);
        console.log(response);
        dispatch(loginSuccess(response.data));
    }
    catch(err){
        dispatch(loginFailure());
    }
}

export const updateUserHistoryRequest=async(data)=>{
    try{
        return await axios.post(`${URL}/history/addHistory`,data);
    }
    catch(err){
        console.log('Error while calling updateUserHistoryRequest api');
    }
}

export const getUserHistoryRequest=async(id)=>{
    try{
        return await axios.get(`${URL}/history/getHistory/${id}`);
    }
    catch(err){
        console.log('Error while calling getUserHistoryRequest api');
    }
}