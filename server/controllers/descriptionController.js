const {Description} = require('../models/models');
const ApiError = require('../error/ApiError');
class DescriptionController{
    async create(req,res){
        const {name} = req.body;
        const description = await Description.create({name});
        return res.json(description);
    }
    async getAll(req,res){
        const descriptions = await Description.findAll();
        return res.json(descriptions);
    }
    async delete(req,res){
        const {id} = req.params;
        const description = await Description.destroy({where: {id}});
        return res.json(description);
    }
}

module.exports = new DescriptionController();