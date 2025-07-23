const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req,res, next){
        try {
            const {login, password, role} = req.body;
            if (!login || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await User.findOne({where: {login}});
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким login уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({login , role: role || "USER", password: hashPassword});
            const basket = await Basket.create({userId: user.id});
            const token = generateJwt(user.id, user.login, user.role);
            return res.json({token});
        } catch (e) {
            console.error('Registration error:', e); // <--- добавь эту строку
            return next(ApiError.internal('Непредвиденная ошибка!'));
        }
    }

    async login(req,res, next){
        const {login, password} = req.body;
        const user = await User.findOne({where: {login}});
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role);
        return res.json({token});
    }

    async chek(req, res, next){
        const token = generateJwt(req.user.id, req.user.login, req.user.role);
        return res.json({
            token,
            user: {
                id: req.user.id,
                login: req.user.login,
                role: req.user.role
            }
        });
    }
}

module.exports = new UserController()