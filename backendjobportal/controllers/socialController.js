const mongoose = require('mongoose')
const Social = require('../models/Social')
const User = require('../models/User')




const index = async (request, response) => {
    const socials = await Social.find().lean()
    if(!socials?.length){
        return response.status(404).json({error: "Social links Not Found"})
    }

    const socialWithUser = await Promise.all(socials.map(async (so) => {
        const user = await User.findById(so.user).lean().exec()
        return { ...so, usernsme: user.name, useremail: user.email }
    }))

    response.json(socialWithUser)

}

const store = async (request, response) => {
    const {user, name, url} = request.body

    if(!user || !name || !url){
        return response.status(409).json({error: "All Fields are required!"})
    }

    const dublicate = await Social.findOne({user, name}).lean().exec()

    if(dublicate){
        return response.status(409).json({error: "Social link already added!",dublicate})
    }


    const social = Social.create({user, name, url})

    if(social){
        return response.status(200).json({message: "Socail link added successfully", social})
    }else{
        return response.status(409).json({error: "Social link does not added Something Wrong!"})
    }


}

const view = async (request, response) => {
    const {user} = request.params

    if(!user){
        return response.status(409).json({error: "User id is required"})
    }

    if(!mongoose.Types.ObjectId.isValid(user)){
        response.status(404).json({error: "not valid id"})
    }

    const social = await Social.find({user}).lean().exec()
    if(!social?.length){
        return response.status(409).json({error: "Social not found"})
    }else{
        return response.status(200).json(social)
        
    }
}

const update = async (request, response) => {
    const {id, user, name, url} = request.body
    if(!id){
        return response.status(409).json({error: "Id required!"})
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return response.status(409).json({error: "Id is not valid!"})
    }
    if(!user){
        return response.status(409).json({error: "User id is required!"})
    }
    if(!name || !url){
        return response.status(409).json({error: "All feilds are required!"})
    }

    const social = await Social.findById(id).lean().exec()
    if(!social){ 
        return response.status(404).json({error: "Social link not found!"})
    }


    const socialupdate = await Social.findByIdAndUpdate({_id: id},{
        name: name,
        url: url
    
    })

    if(socialupdate){
        return response.status(200).json({message: "Social link updated successfully", socialupdate})
    }else{
        return response.status(409).json({error: "Social link not updated something wrong!"})
    }

}

module.exports = {
    index,
    store,
    view,
    update
}


