const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const antispamSchema = new mongoose.Schema({
    userId: reqString,
    messages: Number
})

const name = 'antispam'
module.exports = mongoose.models[name] || mongoose.model(name, antispamSchema, name)