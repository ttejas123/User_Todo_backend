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

			res.send(data)
		}
	})
})

//update specific 
router.post('/update', async (req, res)=>{
	const updateId = req.body.Data._id;
	console.log(updateId)
	const TaskName = req.body.Data.TaskName;
	const Description = req.body.Data.Description;
	const ProjectName = req.body.Data.ProjectName;
	const Priority = req.body.Data.Priority;
	try{
	   await userModel.updateOne({_id:`${updateId}`}, {$set: {
	   	TaskName: TaskName,
		Description:Description,
		ProjectName: ProjectName,
		Priority: Priority,
	   }});
	   res.send("Data is Updated");
	}catch(err){
		console.log(err);
	}
})

//delete Data from dataBase
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