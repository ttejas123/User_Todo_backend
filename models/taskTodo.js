const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
	TaskName:{
		type:String,
		require:true,
	},
	Description:{
		type:String,
		require:true,
	},
	projectId:{
		type:Number,
		require:true,
	},
	Priority:{
		type:Number,
		require:true,
	},
	Created_Date:{
		type:Date,
		require:true,
	},
	Updated_Date:{
		type:Date,
		require:true,
	},
	Task_Status:{
		type:Number,
		require:true,
	},
	Assigner_ID:{
		type:Number,
		require:true,
	},
	User_ID:{
		type:Number,
		require:true,
	},
	Expected_End_Date:{
		type:Date,
		require:true,
	},
	Completed_Date:{
		type:Date,
	}
	
});


const User = new mongoose.model("taskTodo", userDataSchema);
module.exports = User;