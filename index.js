const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');//cross origin resource sharing (share api data with react app)
const taskTodo = require('./routes/taskTodo');
const userProfile = require('./routes/userProfile');
const project = require('./routes/project');
//const logData = require('./routes/logData');

//const team = require('./routes/team');
const port = process.env.PORT || 3001;

app.use(express.json());
const monoDataBase_url = "mongodb+srv://admin:xZnRY7knPOQ0Bdr0@usercurd.teudj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" 

mongoose.connect(monoDataBase_url,{
	useCreateIndex:true,
	useNewUrlParser:true,
	useUnifiedTopology:true,
})


app.get('/',(req, res)=>{
	res.send("hey! serving you guys");
})

 app.use('/taskTodo', taskTodo);
 app.use('/userProfile', userProfile);
// app.use('/logdata', logData);
// app.use('/project', project);

app.listen(port, ()=>{
	console.log("serving 3001");
});