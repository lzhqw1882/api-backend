const axios     = require('axios');
const models    = require('../models');
const urlencode = require('urlencode');

class LibConstants
{
    constructor()
    {

    }
    async getRiotData(version,language,id)
    {
        console.log(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${id}.json`);
        let apiDatas  = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${id}.json`, { validateStatus: false });

        return apiDatas;
    }

    async item(version,language)
    {
        let dbData = {};

        await models.gameInfo.findOne({
            where: {version:version,language:language}
        }).then((row)=>{
            if(row)
            {
                dbData  = row.dataValues;
            }
            else
            {
                dbData  = false;
            }
        });

        return dbData;
    }

    async hasItem(version,language)
    {
        let item = await this.item(version,language)

        return item ? true : false;
    }
}

module.exports = new LibConstants();