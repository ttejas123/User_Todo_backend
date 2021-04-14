const express = require('express');
let router = express.Router();

const taskData = require("../models/taskTodo");

//CreateTask new task
router.post('/CreateTask', (req, res)=>{
	const todaysTime = new Date();
	const date = todaysTime.getFullYear()+"-"+(todaysTime.getMonth()+1)+"-"+todaysTime.getDate();
	const axpected_date = todaysTime.getFullYear()+"-"+(todaysTime.getMonth()+1)+"-"+(todaysTime.getDate()+1);
	const DataToAdd = {
		TaskName:req.body.Name,
		Description:req.body.Description,
		projectId:req.body.projectId,
		Priority:req.body.Priority,
		Created_Date:date,
		Updated_Date:date,
		Task_Status:1,
		Assigner_ID:req.body.Assigner_ID,
		User_ID:req.body.User_ID,
		Expected_End_Date:axpected_date,
}
	taskData.create(DataToAdd, (err, data)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.status(201).send(data);
		}
	})
})


//readAll Tasks in Collection the entries done by user or admin
router.get('/read',(req, res)=>{
	//const dbDataToInsert = req.body;
	taskData.find((err, data)=>{
		if(err){
			res.status(500).send(err);
		}else{

			res.send(data)
		}
	})
})
 
//ongoing Task reading of specific user 
router.get('/readNotCheck', (req, res)=>{
	const todaysTime = new Date();
	const date = todaysTime.getFullYear()+"-"+(todaysTime.getMonth()+1)+"-"+todaysTime.getDate();
	taskData.find({Created_Date:date, Task_Status:1},(err, data)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.send(data)
		}
	})
})

//Completed Task reading of specific user
router.get('/readChecked', async (req, res)=>{
	const todaysTime = new Date();
	const date = todaysTime.getFullYear()+"-"+(todaysTime.getMonth()+1)+"-"+todaysTime.getDate();
	await taskData.find({Created_Date:date, Task_Status:2},(err, data)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.send(data)
		}
	})
})

//readAll task of Specific user
router.post('/readAllSecUser', async (req, res)=>{
	const User_ID = req.body.User_ID;
	await taskData.find({User_ID:User_ID},(err, data)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.send(data)
		}
	})
})

//ongoing Task reading 
router.get('/readNotCheck', (req, res)=>{
	const todaysTime = new Date();
	const User_ID = req.body.User_ID;
	const date = todaysTime.getFullYear()+"-"+(todaysTime.getMonth()+1)+"-"+todaysTime.getDate();
	taskData.find({Created_Date:date, Task_Status:1, User_ID:User_ID},(err, data)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.send(data)
		}
	})
})

//Completed Task reading
router.get('/readChecked', async (req, res)=>{
	const todaysTime = new Date();
	const User_ID = req.body.User_ID;
	const date = todaysTime.getFullYear()+"-"+(todaysTime.getMonth()+1)+"-"+todaysTime.getDate();
	await taskData.find({Created_Date:date, Task_Status:2, User_ID:User_ID},(err, data)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.send(data)
		}
	})
})


//update specific Task Data
router.post('/UpdatedTask', async (req, res)=>{
	const updateId = req.body._id;
	console.log(updateId)
	const TaskName=req.body.TaskName;
	const Description=req.body.Description;
	const projectId=req.body.projectId;
	const Priority=req.body.Priority;
	const Updated_Date= new Date();
	const Task_Status= 1;
	const Assigner_ID= req.body.Assigner_ID;
	const User_ID= req.body.User_ID;
	try{
	   await taskData.updateOne({_id:`${updateId}`}, {$set: {
	   	TaskName: TaskName,
		Description:Description,
		ProjectName: ProjectName,
		projectId:projectId,
		Priority: Priority,
		Updated_Date:Updated_Date,
		Task_Status:Task_Status,
		Assigner_ID:Assigner_ID,
		User_ID:User_ID,
	   }});
	   res.send("Data is Updated");
	}catch(err){
		console.log(err);
	}
})

//Checkin Process here your Project is completed
router.post('/CheckIn', async (req, res)=>{
	const todaysTime = new Date();
	const date = todaysTime.getFullYear()+"-"+(todaysTime.getMonth()+1)+"-"+todaysTime.getDate();
	const updateId = req.body._id;
	const Updated_Date= new Date();
	const Task_Status= 2;
	const Completed_Date=date;
	try{
	   await taskData.updateOne({_id:`${updateId}`}, {$set: {
	   	Task_Status : Task_Status,
	   	Completed_Date:Updated_Date,
		Updated_Date:Updated_Date,
	   }});
	   res.send("Data is Updated");
	}catch(err){
		console.log(err);
	}
})


module.exports = router;