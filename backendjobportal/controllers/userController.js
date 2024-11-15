const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')


const index = async (request, response) => {
    const users = await User.find().select('-password').lean().sort({ created_at: -1 })
    if(!users?.length){
        return response.status(404).json({error: "Users Not Found"})
    }else{
       return response.json(users)
    }
}

const store = async (request, response) => {
    //get all fields from request
    const { name, email, password } = request.body

    // check if get all fileds
    if(!name || !email || !password){
        return response.status(400).json({error: "All fields are required"})
    }
    
    // check if email already exists
    const duplicate = await User.findOne({email}).lean().exec()
    if(duplicate){
        return response.status(409).json({error: "Email already exists"})
    }

    // Bcrypt password
    const pass = await bcrypt.hash(password,10)

    try {
        const user = await User.create({
            name, email, "password": pass
        })
        response.status(200).json({message: "User Created Successfully", user})
    } catch(error){
        response.status(400).json({error: error.message})
    }

}

const view = async (request, response) => {
    const { id } = request.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        response.status(404).json({error: "User Not Found"})
    }
    const user = await User.findById(id)
    if(user){
        response.status(200).json(user)
    }else{
        response.status(404).json({error: "User Not Found"})
    }
}

const update = async (request, response) => {
    // Get All fields from request
    const {id, name, email, password, phone, bio, address, country, city, 
        state, zip_code, profile_img, skills, resume, status} = request.body

        if(!mongoose.Types.ObjectId.isValid(id)){
            return response.status(404).json({error: "User not found"})
        }
        const user = await User.findById(id).exec()
        if(!user){
            return response.status(404).json({error: "User not found"})
        }
        const dublicate = await User.findOne({email}).lean().exec()
        if(dublicate && dublicate?._id.toString() !== id){
            return response.status(409).json({error: "User already exists"})
        }

        if(password){
             password = await bcrypt.hash(password,10)
        }

        const userupdate = await User.findByIdAndUpdate({_id: id}, {
            ...request.body
        });

        if(userupdate){
            return response.status(200).json({message: "User Updated Successfully", userupdate})
        }else{
            return responses.status(400).json({error: "User Not Updated Something Wrong!"})
        }
    
}

const destroy = async (request, response) => {
    const { id } = request.params


    if(!id){
        return response.status(404).json({error: "User ID Required"})
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        response.status(404).json({error: "Not Valid Id"})
    }

   

    const user = await User.findById(id).exec()
    if(!user){
        return response.status(404).json({error: "User Not Found"})
    }

    const unactiveuser = await User.findOneAndDelete({_id: id});

    if(unactiveuser){
        return response.status(200).json({message: "User Deleted Successfuly", unactiveuser})
    }else{
        return response.state(409).json({error: "User Not Deleted Something Wring!"})
    }

}

module.exports = {
    index,
    store,
    view,
    update,
    destroy
}