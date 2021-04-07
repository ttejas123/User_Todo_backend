const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
	Name:{
		type:String,
		require:true,
	},
	Email:{
		type:String,
		require:true,
	},
	Mnumber:{
		type: String,
		require:true,
	},
	profileUrl:{
		type:String,
		require:true,
	},
	projectTaskTodo:{
		type:Date,
	}
});


const User = new mongoose.model("userProfile", userDataSchema);
module.exports = User;