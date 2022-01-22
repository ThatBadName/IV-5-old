const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const logSchema = new mongoose.Schema({
    logID: reqString,
    _id: reqString,
})

const name = 'log'
module.exports = mongoose.models[name] || mongoose.model(name, logSchema, name)
