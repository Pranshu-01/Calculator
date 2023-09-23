import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { getUserHistoryRequest, updateUserHistoryRequest } from './services/api';
import { addCalculation } from './redux/features/historyRedux';

function App() {

	const dispatch=useDispatch();

	const user=useSelector((state)=>state.user.currentUser);

	const history=useSelector((state)=>state.history);

	useEffect(()=>{
		if(user){
			updateUserHistory();
		}
	},[history]);

	const updateUserHistory=async()=>{
		const data={
			userId:user._id,
			calculations:history.calculations
		}
		await updateUserHistoryRequest(data);
	}

	useEffect(()=>{
		if(user){
			getUserHistory();
		}
	},[user]);

	const getUserHistory=async()=>{
		const res=await getUserHistoryRequest(user._id);

		res.data.calculations.map((item)=>{
			dispatch(addCalculation(item))
		})
	}

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home/>} />
					<Route path="/login" element={user? <Navigate to="/"/> : <Login/>} />
          			<Route path="/register" element={<Register/>}/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
