const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
    {
        projectName: { type: String,
             required: true },
        description:{  type: String,
            required:true },
        startDate: { type: Date,
             required: true },
        endDate: { type: Date,
            required: true },  
        projectStatus : {type : Number,
             required :true},
        teamMembers: [Number],
        createdDate: { type: Date,
            required: true },
        updatedDate: { type: Date,
                required: true },
        deletedDate: { type: Date,
                    required: true },
    },

)

module.exports = mongoose.model('projects', Project)