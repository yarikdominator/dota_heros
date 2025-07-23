const {Name} = require('../models/models');
const ApiError = require('../error/ApiError');
class NameController{
    async create(req,res){
        const {name} = req.body;
        const Name_ = await Name.create({name});
        return res.json(Name_);
    }
    async getAll(req,res){
        const names = await Name.findAll();
        return res.json(names);
    }
    async delete(req,res){
        const {id} = req.params;
        const name = await Name.destroy({where: {id}});
        return res.json(name);
    }
}

module.exports = new NameController();