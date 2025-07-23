const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define('user' , {
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login:{type:DataTypes.STRING, unique:true},
    password:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING , defaultValue:"USER"}
});

const Hero = sequelize.define('hero', {
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    lore: {type: DataTypes.TEXT, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false}
});

module.exports = {
    User,
    Hero
};