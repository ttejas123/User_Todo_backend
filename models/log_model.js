const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Log = new Schema(
    {
        UserId : {
            type:Number,
            required : true
        },
        Log_Date : {
            type:Date,
            required:true
        },
        Morning_Log : {
            type:String,
        },
        Afternoon_Log : {
            type:String
        },
        Achievements : {
            type:String,
        },
        Updated_Date: 
        { 
            type: Date,
            required: true },
        Deleted_Date: 
        { 
            type: Date,
             required: true },    
        flag_ML:
        {
            type:Number,
            required:true
        },
        flag_AL:{
            type:Number,
            required:true
        },
        flag_AchL:{
            type:Number,
            required:true
        },
    },

)

module.exports = mongoose.model('logs', Log)