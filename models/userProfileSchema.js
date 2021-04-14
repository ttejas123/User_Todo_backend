const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
	Name:{
		type:String,
		require:true,
	},
	Email:{
		type:String,
		require:true,
		unique:true
	},
	password:{
		type:String,
		require:true,
	},
	Mobnumber:{
		type: String,
		require:true,
	},
	profileUrl:{
		type:String,
	},
	is_Deactivated:{
		type:Number,
	},
	last_LogIn:{
		type:Date,
	},
	is_admin:{
		type:Number,
	},
	Created_Date:{
		type:Date,
	},
	Updated_Date:{
		type:Date,
	},
	Deactivated_Date:{
		type:Date,
	}
});


const User = new mongoose.model("userProfile", userDataSchema);
module.exports = User;