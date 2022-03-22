const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    email: String,
    tasks: String,
    isComplete: Boolean,
    useFindAndModify : false
})

const Task = mongoose.model('task', TaskSchema)

module.exports = Task