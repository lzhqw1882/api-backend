const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "matchList", // 테이블 이름
        {
            seq:{
                type : Sequelize.INTEGER,
                autoIncrement: true,
                allowNull : false,
                primaryKey: true
            },
            accountId:{
                type: Sequelize.STRING(67),
                allowNull : false
            },
            gameId:{
                type: Sequelize.BIGINT(11),
                allowNull : false
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
