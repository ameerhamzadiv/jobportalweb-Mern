const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    type: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: false,
    },
    exprerience: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)