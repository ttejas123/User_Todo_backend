const express = require('express');
let router = express.Router();

const userModel = require("../models/log");


//Create user in signUp
router.post('/signUp', async (req, res)=>{
	const todaysDate = new Date();
	const DataToAdd = {
		Name:req.body.Data.Name,
		Email:req.body.Data.Email,
		password:req.body.Data.password,
		Mobnumber:req.body.Data.Mobnumber,
		profileUrl:req.body.Data.profileUrl,
		is_Deactivated: 0 ,
		last_LogIn: todaysDate,
		is_admin: req.body.Data.is_admin,
		Created_Date: todaysDate,
		Updated_Date: todaysDate,
		Deactivated_Date: todaysDate, //don't know what to put here so there for i put today'sDate for testing
	}
	userModel.create(DataToAdd, (err, data)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.status(201).send(data);
		}
	})
})

module.exports = router;