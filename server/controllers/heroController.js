const uuid = require('uuid');
const path = require('path');
const {Hero} = require('../models/models');
const ApiError = require('../error/ApiError');

class HeroController{
    async create(req, res, next) {
        try {
            const { name, description, lore } = req.body;
            let fileName = null;
            if (req.files && req.files.image) {
                const { image } = req.files;
                fileName = uuid.v4() + ".jpg";
                image.mv(path.resolve(__dirname, '..', 'static', fileName));
            } else {
                return next(ApiError.badRequest('Нет изображения героя!'));
            }
            const hero = await Hero.create({ name, description, lore, image: fileName });
            return res.json(hero);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res) {
        let { limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const heroes = await Hero.findAndCountAll({ limit, offset });
        return res.json(heroes);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const hero = await Hero.findOne({ where: { id } });
        return res.json(hero);
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description, lore } = req.body;
            let updateData = { name, description, lore };
            if (req.files && req.files.image) {
                const { image } = req.files;
                const fileName = uuid.v4() + ".jpg";
                image.mv(path.resolve(__dirname, '..', 'static', fileName));
                updateData.image = fileName;
            }
            const [updated] = await Hero.update(updateData, { where: { id } });
            if (!updated) return next(ApiError.badRequest('Герой не найден!'));
            const hero = await Hero.findOne({ where: { id } });
            return res.json(hero);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        const hero = await Hero.destroy({ where: { id } });
        return res.json(hero);
    }
}

module.exports = new HeroController();