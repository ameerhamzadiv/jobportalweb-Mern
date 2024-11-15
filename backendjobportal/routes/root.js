const express = require('express')
const router = express.Router()
const path = require('path')

//Create defualt main page route
// ^ means beginig of string 
// / means main domain page 
// $ means end of the string only
// ^/$ means requested route only page / or example.com
// | means OR
// /index means if or exampe.com/index
// (.html)? means OR exampe.com/index.html

// if get route / or /index or index.html    
// response.sendFile means show file  
// path.join means go to path   
// __dirname in folder
// '..' means go back from this routes folder
// 'views' means go to views folder
// 'index.html' means go to this file or show this file
 
router.get('^/$|/index(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// 404 error show if requested route not created
router.all('*', (request, response) => {
    response.status(404)
    if(request.accepts('html')){
        response.sendFile(path.join(__dirname, '..', 'views', '404.html'))
    } else if(request.accepts('json')){
        response.json({ meesage: "404 not found"})
    }else{
        response.type('txt').send('404 not found')
    }

})

module.exports = router

