const mongoose = require('mongoose');


const userDataSchema = new mongoose.Schema({
	TeamName:{
		type:String,
		require:true,
	},
	teamMembers:[String],
	AllPrjects:[String],
	ProjectsCompleted:[String],
	ProjectsRemaining:[String]
});


const User = new mongoose.model("team", userDataSchema);
module.exports = User;