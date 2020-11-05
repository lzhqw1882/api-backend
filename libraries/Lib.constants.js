const axios     = require('axios');
const models    = require('../models');
const urlencode = require('urlencode');

class LibConstants
{
    constructor()
    {

    }
    async getRiotData(id)
    {
        let apiDatas  = await axios.get('http://static.developer.riotgames.com/docs/lol/'+id+'.json', { validateStatus: false });

        return apiDatas;
    }

    async item(id)
    {
        let dbData = {};

        await models.constants.findOne({
            where: {title:id}
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

    async hasItem(id)
    {
        let item = await this.item(id)

        return item ? true : false;
    }
}

module.exports = new LibConstants();