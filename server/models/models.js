const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    email: String,
    tasks: String,
    isComplete: Boolean,
    Users:{
        id: Integer,
        FirstName: String,
        LastName: String,
        Phone: Integer,
        UserPhoto: binData,
    },
    Trashes:{
        id: Integer,
        UserId: Integer,
        Longitute: double,
        Latitude: double,
        Photo: binData,
        SizeId: Integer,
    },
    Events:{
        Id: Integer,
        CreatorId:Integer,
        EventName: String,
        EventDescription:String,
        StartDateTime: new Date,
        EndDateTime: new Date,
        Latitude:double,
        Longitude:double,
    },
    UsersAtEvent:{
        EventId: Integer,
        UserId: Integer,
    },
    useFindAndModify : false


})

const Task = mongoose.model('task', TaskSchema)

module.exports = Task