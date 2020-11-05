const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "constants", // 테이블 이름
        {
            title:{
                type : Sequelize.STRING(32),
                allowNull : false,
                unique: true,
                primaryKey: true
            },
            datas:{
                type: Sequelize.JSON,
                allowNull : false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            }
        },
        {
            // 테이블 옵션
            timestamps: true
        }
    );
};
