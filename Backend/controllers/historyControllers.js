const History = require('../models/historySchema');

const addUserHistory = async (req, res) => {
	const newHistory = new History({
		userId: req.body.userId,
		calculations:req.body.calculations
	});

	try {
		await History.findOneAndDelete({userId:req.body.userId});
		const savedData=newHistory.save();
		res.status(200).json(savedData);
	} 
	catch (err) {
		res.status(500).json(err);
	}
};

const getUserHistory=async(req,res)=>{
	const {userId}=req.params;

	try{
		const data=await History.findOne({userId:userId});
		res.status(200).json(data);
	}
	catch(err){
		res.status(500).json(err);
	}
}

module.exports = {
	addUserHistory,
	getUserHistory
};
