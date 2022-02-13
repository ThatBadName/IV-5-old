const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const balSchema = new mongoose.Schema({
    userId: reqString,
    amount: {type: Number, default: 0},
})

const name = 'balance'
module.exports = mongoose.models[name] || mongoose.model(name, balSchema, name)