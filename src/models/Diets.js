const { DataTypes } = require("sequelize");

module.exports = (sequelize)=>{
    sequelize.define('diets', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{
        timestamps: false
    })


}