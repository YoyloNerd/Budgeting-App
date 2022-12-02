const express = require('express');
// const Model = require('../database/schema/temp');
const router = express.Router()
//Post Method
router.post('/post', (req, res) => {
    // const data = Model.create({
    //     name: req.body.name,
    //     age: req.body.age
    // })
})

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})
router.use('/auth', require('./auth'))
router.use('/accounting', require('./accounting'))
module.exports = router;