const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "champion", // 테이블 이름
        {
            seq:{
                type : Sequelize.INTEGER,
                autoIncrement: true,
                allowNull : false,
                primaryKey: true
            },
            id:{
                type : Sequelize.STRING(36),
                allowNull : false,
            },
            key:{
                type : Sequelize.INTEGER,
                allowNull : false,
            },
            version:{
                type : Sequelize.STRING(16),
                allowNull : false,
            },
            language:{
                type : Sequelize.STRING(5),
                allowNull : false,
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
