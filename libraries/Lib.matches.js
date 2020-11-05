const axios         = require('axios');
const models        = require('../models');
const urlencode     = require('urlencode');
const libConfig     = require('./Lib.config');

class LibMatches
{
    constructor() {}

    // id : accountId
    async getApi(region, gameId)
    {
        let datas;
        try {
            datas    = await axios.get('https://'+region+'.api.riotgames.com/lol/match/'+libConfig.getRiot('version')+'/matches/'+gameId+'?api_key='+libConfig.getRiot('apiKey'));
        }
        catch(e) {
            datas   = e.response;
        }

        return datas;
    }

    async getRow(gameId)
    {
        let row = false;

        await models.matches.findOne({
            where: {gameId:gameId}
        }).then((result)=>{
            if(result)
            {
                row   = result.dataValues;
            }
            else
            {
                row   = false;
            }
        });

        return row;
    }
}

module.exports = new LibMatches();