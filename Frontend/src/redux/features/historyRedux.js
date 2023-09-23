import { createSlice } from "@reduxjs/toolkit";

const historySlice=createSlice({
    name:"history",
    initialState:{
        calculations:[],
    },
    reducers:{
        addCalculation:(state,action)=>{
            state.calculations.push(action.payload)
        },
        deleteCalculation:(state,action)=>{
            let find=state.calculations.find((item)=>item.id===action.payload.id);
            state.calculations=state.calculations.filter((item)=>find!=item);
        },
        logoutUser:(state)=>{
            state.calculations=[];
        }
    }
})

export const {addCalculation,deleteCalculation,logoutUser}=historySlice.actions;
export default historySlice.reducer;