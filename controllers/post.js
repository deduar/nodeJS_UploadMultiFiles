const { response } = require('express');
const models = require('../models');

// List all Post
function index(req,res,next){
    models.post.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went worng",
            error: error
        })
    });
}

// Show single Post by Id
function show(req,res,next){
    const id = req.params.id;
    models.post.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "Post not found!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went worng",
            error: error
        })
    });
}

// Save new Post
function save(req,res,nex){
    const post = {
        carId: req.body.carId,
        make: req.body.make,
        model: req.body.model,
        description: req.body.description,
        segment: req.body.segment,
        bodyStyle: req.body.bodyStyle,
        fuelType: req.body.fuelType,
        transmision: req.body.transmision,
        numSeat: req.body.numSeat,
        powerCV: req.body.powerCV,
        powerKW: req.body.powerKW,
        doors: req.body.doors,
        year: req.body.year,
        imageUrl: req.body.image_url,
        userId: req.body.userId
    };
    models.post.create(post).then(result => {
        res.status(201).json({
            message: "Post created succesfuly",
            post: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went worng",
            error: error
        });
    });
}

// Update Post bu Id
function update(req,res,next){
    const id = req.params.id;
    const updatePost = {
        carId: req.body.carId,
        make: req.body.make,
        model: req.body.model,
        description: req.body.description,
        segment: req.body.segment,
        bodyStyle: req.body.bodyStyle,
        fuelType: req.body.fuelType,
        transmision: req.body.transmision,
        numSeat: req.body.numSeat,
        powerCV: req.body.powerCV,
        powerKW: req.body.powerKW,
        doors: req.body.doors,
        year: req.body.year,
        register: req.body.register,
        imageUrl: req.body.image_url,
        userId: req.body.userId
    };
    const userId = 1;
    models.post.update(updatePost,{where: {id:id}}).then(result => {
        res.status(200).json({
            message: "Post updated successfully",
            post: result
        });
    }).catch(error => 
        res.status(500).json({
            message: "Something went worng",
            error: error
        })
    );
}

// Delete Post by Id
function destroy(req,res,next){
    const id = req.params.id;
    const userId = 1;
    models.post.destroy({where:{id:id, userId:userId}}).then(result => {
        res.status(200).json({
            message: "Post deleted successfully"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went worng",
            error: error
        })
    });
}


module.exports = {
    index: index,
    show: show,
    save: save,
    update: update,
    destroy: destroy
}