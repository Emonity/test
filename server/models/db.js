const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://localhost:27017/taskList', {
    useUnifiedTopology: true,
    useNewUrlParser: true,                               
}, err => {
    if(err) console.log('Error in DB connection ' + err)
    console.log('MongoDB connection successed...')
})