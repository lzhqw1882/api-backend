const axios         = require('axios');
const models        = require('../models');
const urlencode     = require('urlencode');
const libConfig     = require('./Lib.config');

class LibSummoners
{
    constructor() {}

    async getApi(platformId, summonerName)
    {
        let datas;

        try {
            datas    = await axios.get('https://'+platformId+'.api.riotgames.com/lol/summoner/'+libConfig.getRiot('version')+'/summoners/by-name/'+urlencode(summonerName)+'?api_key='+libConfig.getRiot('apiKey'));
        }
        catch(e) {
            datas   = e.response;
        }

        return datas;
    }

    async store(summonerId,platformId,datas)
    {
        let sets    = {
            summonerId:summonerId,
            platformId:platformId,
            datas:datas
        };

        await models.summoners.create(sets);

        return datas;
    }

    async update(summonerId,datas)
    {
        let sets    = {datas: datas};

        await models.summoners.update(sets, { where: { summonerId:summonerId } });

        return datas;
    }

    async getSummonerBySummonerId(summonerId)
    {
        let row = false;

        await models.summoners.findOne({
            where: {summonerId:summonerId}
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

module.exports = new LibSummoners();