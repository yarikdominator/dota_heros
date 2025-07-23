const {LorHero} = require('../models/models');
const ApiError = require('../error/ApiError');
class lorController{
    async create(req,res){
        const {lor_description} = req.body;
        const lorHero = await LorHero.create({lor_description});
        return res.json(lorHero);
    }
    async getAll(req,res){
        const lorHeroes = await LorHero.findAll();
        return res.json(lorHeroes);
    }
    async delete(req,res){
        const {id} = req.params;
        const lorHero = await LorHero.destroy({where: {id}});
        return res.json(lorHero);
    }
}

module.exports = new lorController();