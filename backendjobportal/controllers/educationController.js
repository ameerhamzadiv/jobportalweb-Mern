const mongoose = require('mongoose')
const Education = require('../models/Education')
const User = require('../models/User')

const index = async (request, response) => {
    const edu = await Education.find().lean()
    if(!edu?.length){
        return response.status().json({error: "Education not found"})
    }

    const eduWithUser = await Promise.all(edu.map(async (edication) => {
        const user = await User.findById(edication.user).lean().exec()
        return { ...edication, username: user.name, useremail: user.email } 
    }))

    response.json(eduWithUser)
}

const store = async (request, response) => {
    const {user, title, academy, start, end, description} = request.body
    if(!user){
        return response.status(409).json({error: "User id is required!"})
    }
    if(!mongoose.Types.ObjectId.isValid(user)){
        return response.status(409).json({error: "User id not valid"})
    }
    if(!title || !academy || !start || !end){
        return response.status(409).json({error: "Some fields are required!"})
    }

    const education = await Education.create({
        ...request.body
    })
    if(education){
        return response.status(200).json({message: "Education Added Successfully"})
    }else{
        return response.status(500).json({error: "Education not added Something Wrong!"})
    }
    
}

const view = async (request, response) => {
    const {user} = request.params
    if(!user){
        return response.status(409).json({error: "User id  is required!"})
    }
    if(!mongoose.Types.ObjectId.isValid(user)){
        return response.status(409).json({error: "User id not valid!"})
    }

    const education = await Education.find({user}).lean().exec()
    if(!education?.length){
        return response.status(404).json({error: "Education not found!"})
    }else{
        return response.status(200).json(education)
    }
}