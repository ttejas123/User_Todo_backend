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
	ProjectName:{
		type: String,
		require:true,
	},
	Priority:{
		type:Number,
		require:true,
	},
	CreatedAt:{
		type:Date,
	}
});


const User = new mongoose.model("taskTodo", userDataSchema);
module.exports = User;