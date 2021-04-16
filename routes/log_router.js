const express = require('express');
const logModel = require("../models/log_model");
const logRouter = express.Router();

logRouter.post('/addLog',async(req,res)=>{
    const temp = new Date();
    var year = temp.getFullYear();
    var month = temp.getMonth()+1;
    var date = temp.getDate();
   // console.log(temp.getMonth());
    const todaysDate = `${year}-${month}-${date}`;
    // console.log(todaysDate);
    // console.log("inside post");
    //console.log(logModel);
    const dataToAdd = {
        UserId : req.body.UserId,
        Log_Date : todaysDate,
        Morning_Log : req.body.Morning_Log,
        Afternoon_Log : req.body.Afternoon_Log,
        Achievements : req.body.Achievements,
        Updated_Date : todaysDate,
        Deleted_Date : todaysDate,
        flag_ML : req.body.flag_ML,
        flag_AL : req.body.flag_AL,
        flag_AchL : req.body.flag_AchL   
    }
  //  console.log(dataToAdd);
    logModel.create(dataToAdd,(err,data)=>{
        if(err){
            const Data = {
                status : 0,
                msg : "Failed to get your Data"
            }
            res.status(500).send(Data);
		}else{
            const Data = {
                status:1,
                msg:"Data Fetched",
                data : data
            }
			res.status(201).send(Data);
		}
    })
})

logRouter.post('/editLog',async(req,res)=>{
    const updateId = req.body._id;
    const Morning_Log = req.body.Morning_Log;
    const Afternoon_Log = req.body.Afternoon_Log;
    const Achievements = req.body.Achievements;
    const flag_ML = req.body.flag_ML;
    const flag_AL = req.body.flag_AL;
    const flag_AchL = req.body.flag_AchL; 
    try{
        await logModel.updateOne({_id:`${updateId}`}, {$set: {
         Morning_Log : Morning_Log,
         Afternoon_Log : Afternoon_Log,
         Achievements : Achievements,
         flag_ML : flag_ML,
         flag_AL : flag_AL,
         flag_AchL : flag_AchL
        }});
        res.send("Data is Updated");
     }catch(err){
         console.log(err);
     }
})

logRouter.post('/getLogsById',(req, res)=>{
	//const dbDataToInsert = req.body;
    //console.log("in get")
	logModel.find({UserId:req.body.UserId},(err, data)=>{
		if(err){
            const Data = {
                status : 0,
                msg : "Failed to get your Data"
            }
            res.status(500).send(Data);
		}else{
            const Data = {
                status:1,
                msg:"Data Fetched",
                data : data
            }
			res.status(201).send(Data);
		}
	}).sort({Log_Date:-1})
})

logRouter.get('/getAllLogs',(req, res)=>{
	//const dbDataToInsert = req.body;
    //console.log("in get")
	logModel.find((err, data)=>{
		if(err){
            const Data = {
                status : 0,
                msg : "Failed to get your Data"
            }
            res.status(500).send(Data);
		}else{
            const Data = {
                status:1,
                msg:"Data Fetched",
                data : data
            }
			res.status(201).send(Data);
		}
	}).sort({Log_Date:1,UserId:1})
})
logRouter.post('/getLogsByDate',(req, res)=>{
	//const dbDataToInsert = req.body;

   // console.log("in get")
	logModel.find({Log_Date:req.body.date},(err, data)=>{
		if(err){
            const Data = {
                status : 0,
                msg : "Failed to get your Data"
            }
            res.status(500).send(Data);
		}else{
            const Data = {
                status:1,
                msg:"Data Fetched",
                data : data
            }
			res.status(201).send(Data);
		}
	}).sort({UserId:1})
})
logRouter.post('/getLogsByDateAndUserId',(req, res)=>{
	//const dbDataToInsert = req.body;
   // console.log("in get by date");
	logModel.find({Log_Date:req.body.date,UserId:req.body.UserId},(err, data)=>{
		if(err){
            const Data = {
                status : 0,
                msg : "Failed to get your Data"
            }
            res.status(500).send(Data);
		}else{
            const Data = {
                status:1,
                msg:"Data Fetched",
                data : data
            }
			res.status(201).send(Data);
		}
	}).sort({UserId:1})
})
module.exports = logRouter