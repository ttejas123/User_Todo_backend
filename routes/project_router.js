const express = require('express');
const router = express.Router();
const projectModel = require('../models/project_model');

router.post('/addProject/',async(req,res)=>{
    const todaysDate = new Date();
    console.log(todaysDate);
    let flag = 1;
    //console.log("inside post");
    projectModel.find({}, { _id: 1, projectName : 1},(err, data)=>{
		if(err){
			res.status(500).send(err);
		}else{
            //console.log(data);
            for(let i=0;i<data.length; i++)
            {
                const temp = data[i];
                let key = "projectName"
                if(req.body.projectName === temp[key])
                {
                    flag=0;
                    console.log("Name already exists");
                    const Data = {
                        status : 0,
                        msg : "Project Name Already Exists"
                    }
                    res.status(500).send(Data);
                }
            }
			//res.status(200).send(data);
		}
	})

    if (flag)
    {
        const dataToAdd = {
            projectName : req.body.projectName,
            description : req.body.description,
            startDate : req.body.startDate,
            endDate : todaysDate,
            projectStatus : req.body.projectStatus,
            teamMembers : req.body.teamMembers,
            createdDate : todaysDate,
            updatedDate : todaysDate,
            deletedDate : todaysDate
        }
        projectModel.create(dataToAdd,(err,data)=>{
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
    }
    
})

router.post('/updateProject',async(req,res)=>{
    //console.log("inside update");
        const todaysDate = new Date();
        const updateId = req.body._id;
        const projectName = req.body.projectName;
        const description = req.body.description;
        const endDate = todaysDate;
        const projectStatus = req.body.projectStatus;
        const teamMembers = req.body.teamMembers;
        const updatedDate = todaysDate;
        const deletedDate = todaysDate;
        try{
            await projectModel.updateOne({_id:`${updateId}`}, {$set: {
              projectName : projectName,
              description : description,
              endDate : endDate,
              projectStatus : projectStatus,
              teamMembers : teamMembers,
              updatedDate : updatedDate,
              deletedDate : deletedDate
            }});
            res.send("Data is Updated");
         }catch(err){
             console.log(err);
         }
})

router.get('/getProjects',(req, res)=>{
	//const dbDataToInsert = req.body;
    //console.log("in get")
	projectModel.find((err, data)=>{
		if(err){
            const Data = {
                status : 0,
                msg : "Unable to get your requested Data"
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


router.get('/getProjectIds',(req, res)=>{
	//const dbDataToInsert = req.body;
    //console.log("in get")
	projectModel.find({}, { _id: 1, projectName : 1},(err, data)=>{
		if(err){
            const Data = {
                status : 0,
                msg : "Unable to get your requested Data"
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

router.post('/getProjectById',(req, res)=>{
	//const dbDataToInsert = req.body;
    // console.log("in server",req.body);
    // console.log("in server",req.body._id);
	projectModel.find({_id:req.body._id},(err, data)=>{
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
// router.post('/deactivateProject', async(req, res)=>{
// 	const todaysDate = new Date();
// 	const deactivateProjectId = req.body.Data._id;
// 	try{
// 		await projectModel.updateOne({_id:`${deactivateProjectId}`}, {$set:{
// 			is_Deactivated: 1,
// 			Deactivated_Date: todaysDate,
// 		}})
// 	}catch(err){
// 		console.log(err);
// 	}
// })

// router.put('/project/:id', ProjectCtrl.updateProject)
// router.delete('/project/:id', ProjectCtrl.deleteProject)
// router.get('/project/:id', ProjectCtrl.getProjectById)
// router.get('/projects', ProjectCtrl.getProjects)

module.exports = router