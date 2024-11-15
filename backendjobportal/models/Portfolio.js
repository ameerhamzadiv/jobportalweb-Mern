const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    url: {
        type: String,
        required: false
    },
    img: [{
        type: String,
        required: true
    }]
}, { timestamps: true })

module.exports = mongoose.model('Portfolio', portfolioSchema)