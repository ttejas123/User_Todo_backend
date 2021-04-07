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
	}

});


const User = new mongoose.model("myFirstDatabase", userDataSchema);
module.exports = User;