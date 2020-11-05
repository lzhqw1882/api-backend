const axios         = require('axios');
const models        = require('../models');
const urlencode     = require('urlencode');
const libConfig     = require('./Lib.config');

class LibMatchList
{
    constructor() {}

    // id : accountId
    async getApi(region, accountId)
    {
        let datas;
        try {
            datas    = await axios.get('https://'+region+'.api.riotgames.com/lol/match/'+libConfig.getRiot('version')+'/matchlists/by-account/'+accountId+'?api_key='+libConfig.getRiot('apiKey'));
        }
        catch(e) {
            datas   = e.response;
        }

        return datas;
    }
}

module.exports = new LibMatchList();