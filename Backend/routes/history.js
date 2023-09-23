const express=require('express');
const { addUserHistory, getUserHistory } = require('../controllers/historyControllers');
const router=express.Router();

router.post('/addHistory',addUserHistory);

router.get('/getHistory/:userId',getUserHistory);

module.exports=router;