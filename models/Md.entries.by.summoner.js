const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "entriesBySummoner", // 테이블 이름
        {
            seq:{
                type : Sequelize.INTEGER,
                autoIncrement: true,
                allowNull : false,
                primaryKey: true
            },
            leagueId:{
                type : Sequelize.STRING(67),
                allowNull : false,
                unique: true,
                primaryKey: true
            },
            summonerId:{
                type : Sequelize.STRING(67),
                allowNull : false,
            },
            queueType:{
                type: Sequelize.STRING(16),
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
