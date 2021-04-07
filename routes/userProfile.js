const express = require('express');
let router = express.Router();

const userModel = require("../models/taskTodo");
//insert new task in user field
router.post('/insertNew',(req, res)=>{
	const dbDataToInsert = req.body;
	userModel.create(dbDataToInsert, (err, data)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.status(201).send(data);
		}
	})
})

//read all the entries done by user or admin
router.get('/read',(req, res)=>{
	//const dbDataToInsert = req.body;
	userModel.find((err, data)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send(data);
		}
	})
})

//update specific 
router.post('/update', async (req, res)=>{
	const updateId = req.body.Data._id;
	console.log(updateId)
	const Name = req.body.Data.Name;
	const Email = req.body.Data.Email;
	const Mnumber = req.body.Data.Mnumber;
	const profileUrl = req.body.Data.profileUrl;
	const projectTaskTodo = req.body.Data.projectTaskTodo
	try{
	   await userModel.updateOne({_id:`${updateId}`}, {$set: {
	   	Name: Name,
		Email:Email,
		Mnumber: Mnumber,
		profileUrl: profileUrl,
		projectTaskTodo: projectTaskTodo,
	   }});
	   res.send("Data is Updated");
	}catch(err){
		console.log(err);
	}
})

router.post('/delete', async (req, res)=>{
	const deleteId = req.body.deleteId;
	try{
	   await userModel.deleteMany({_id:deleteId})
	   res.send("Data is Deleted");
	}catch(err){
		console.log(err);
	}
})

module.exports = router;