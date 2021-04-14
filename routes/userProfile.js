const express = require('express');
let router = express.Router();

const userModel = require("../models/userProfileSchema");


//Create user in signUp
router.post('/signUp', async (req, res)=>{
	const todaysDate = new Date();
	const DataToAdd = {
		Name:req.body.Name,
		Email:req.body.Email,
		password:req.body.password,
		Mobnumber:req.body.Mobnumber,
		profileUrl:req.body.profileUrl,
		is_Deactivated: 0 ,
		last_LogIn: todaysDate,
		is_admin: req.body.is_admin,
		Created_Date: todaysDate,
		Updated_Date: todaysDate,
		//Deactivated_Date: todaysDate, //don't know what to put here so there for i put today'sDate for testing
	}
	userModel.create(DataToAdd, (err, data)=>{
		if(err){
			const Data = {
				Status : 0,
				msg : `SignUp Failed : email already used`,
			}
			res.status(500).send(Data);
		}else{
			const Data = {
				Status : 1,
				msg : `Your sucessfully SignUp`,
				data : data 
			}
			res.status(201).send(Data);
		}
	})
})

//Update Profile 
router.post('/ProfieUpDate', async (req, res)=>{
	const todaysDate = new Date();
	const updateId = req.body.Data._id;
	console.log(updateId);
	const Name=	req.body.Name;
	const Email= req.body.Email;
	const password=	req.body.password;
	const Mobnumber= req.body.Mobnumber;
	const profileUrl= req.body.profileUrl;
	const Updated_Date = todaysDate; 
	try{
	   await userModel.updateOne({_id:`${updateId}`}, {$set: {
	   	Name:Name,
		Email:Email,
		password:password,
		Mobnumber:Mobnumber,
		profileUrl:profileUrl,
		Updated_Date: Updated_Date
	   }});
	   res.send("Data is Updated");
	}catch(err){
		console.log(err);
	}
})


router.post('/Deactivate_Profile', async(req, res)=>{
	const todaysDate = new Date();
	const DeactivatUserId = req.body.Data._id;
	console.log(DeactivatUserId);
	try{
		await userModel.updateOne({_id:`${DeactivatUserId}`}, {$set:{
			is_Deactivated: 1,
			Deactivated_Date: todaysDate,
		}})
	}catch(err){
		console.log(err);
	}
})


router.post('/LogIN',(req, res)=>{
	const Email = req.body.Data.Email;
	const Password = req.body.Data.Password;

	userModel.find({Email:Email , password:password},(err, data)=>{
		if(err){
			const Data = {
				status: 0,
				msg: "Wrong Email and Password"
			} 
			res.status(500).send(Data);
		}else{
			const Data = {
				status: 1,
				msg: "sucessfully LogIN",
				data: data
			}
			res.status(200).send(Data);
		}
	})
})

//read user data 
router.get('/readUserData', (req, res)=>{
	const userId = req.body.Data._id;
	userModel.find({_id:userId}, (err, data)=>{
		if(err){
			const Data = {
				status: 0,
				msg: "Failed to get Your Data"
			} 
			res.status(500).send(Data);
		}else{
			const Data = {
				status: 1,
				msg: "We Got Data",
				data: data
			}
			res.status(200).send(Data);
		}
	})
})


//read all the entries done by user or admin
router.get('/readAll',(req, res)=>{
	//const dbDataToInsert = req.body;
	userModel.find((err, data)=>{
		if(err){
			const Data = {
				status: 0,
				msg: "failed"
			} 
			res.status(500).send(Data);
		}else{
			const Data = {
				status: 1,
				msg: "sucessfully fetched Data of all user",
				data: data
			}
			res.status(200).send(Data);
		}
	})
})

//We are not going to use this but still for update change
router.post('/DeleteUser',(req, res)=>{
	const userId = req.body._id;
	userModel.remove({_id:userId});
	res.send("Deleted")
})

module.exports = router;