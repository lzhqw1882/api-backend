const axios         = require('axios');
const models        = require('../models');
const urlencode     = require('urlencode');
const libConfig     = require('./Lib.config');

class LibEntriesSummoner
{
    constructor() {}

    async getApi(platformId, summonerId)
    {
        let datas;
        try {
            datas    = await axios.get('https://'+platformId+'.api.riotgames.com/lol/league/'+libConfig.getRiot('version')+'/entries/by-summoner/'+summonerId+'?api_key='+libConfig.getRiot('apiKey'));
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

        await models.entriesBySummoner.create(sets);

        return datas;
    }

    async update(summonerId,datas)
    {
        let sets    = {datas: datas};

        await models.entriesBySummoner.update(sets, { where: { summonerId:summonerId } });

        return datas;
    }

    async hasRow(leagueId,summonerId,queueType)
    {
        let where   = {leagueId:leagueId,summonerId:summonerId,queueType:queueType};
        let has     = false;
        await models.entriesBySummoner.findOne({where:where}).then(
            (result)=>{
                if(result)
                {
                    has   = true;
                }
            }
        );

        return has;
    }
}

module.exports = new LibEntriesSummoner();