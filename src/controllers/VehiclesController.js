const express = require('express');
const Vehicles = require('../models/VehiclesModel')
const multer = require('multer');
const multerConfig = require('../config/multer')

class VehiclesController {   
    
    async create (req, res, next ){             

        const tractor = {
            vehicleName: req.body.vehicleName,
            vehicleImage: req.file.path
        }               
        
        if(!tractor.vehicleName){
            res.status(400);
            res.send({message: "Insira um nome"})
            return;
        }
                
        try{
            var result = await Vehicles.find({vehicleName: tractor.vehicleName})
            if(result.length>0){                             
                res.status(400);
                res.send({message: "O nome já está cadastrado no banco de dados"})
                return;
            }else{
                var newTractor = await Vehicles.create(tractor)                
                res.status(200);        
                res.send({message: "Veículo adicionado com sucesso!", newTractor: newTractor})   
                return             
            }
        }catch(err){  
            res.status(500)          
            res.send({message: "Ocorreu um erro ao cadastrar: "+ err})
        }       
    }

    async findAll(req, res) {
        try{
            var results = await Vehicles.find({});
            res.status(200);
            res.send(results);
        }catch(err){
            res.status(500)
            res.send({message: "Ocorreu um erro na busca: " + err})
        }
        
    }

    async findById(req,res){
        var {_id} = req.body;
        try{
            var result = await Vehicles.find({_id: _id});
            if(result.length>0){
                res.status(200);
                res.send({message: result})
            }
            
        }catch(err){
            res.status(500);
            res.send({message: "Ocorreu um erro ao buscar: " + err})
        }

    }

    async update(req, res){
        var{_id, name, image} = req.body;        
        try{        
            var result = await Vehicles.findByIdAndUpdate(_id,{name: name, image: image})            
            res.status(200);
            res.send({message: result});
            return;            

        }catch(err){
            res.status(500);
            res.send({message: "Ocorreu um erro: " + err})
        }

    }

    async delete(req,res){
        var {_id} = req.body;
        try{
            var result = await Vehicles.deleteOne({_id: _id});
            res.status(200);
            res.send({message: "Veículo deletado com sucesso!"})
        }catch(err){
            res.status(500);
            res.send({message: "Ocorreu um erro: "+ err})
        }       
        
    }
}

module.exports = new VehiclesController();