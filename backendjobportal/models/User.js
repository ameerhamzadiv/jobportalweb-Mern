const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false   
    },
    country: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    zip_code: {
        type: String,
        required: false
    },
    profile_img: {
        type: String,
        required: false
    },
    skills: [{
        type: String,
        required: false
    }],
    resume: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "User"
    },
    website: {
        type: String,
        required: false
    },
    founded_at: {
        type: Date,
        required: false
    },
    company_size: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    },
},{ timestamps: true })

module.exports = mongoose.model('User', userSchema)
