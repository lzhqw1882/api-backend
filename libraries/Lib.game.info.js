const axios     = require('axios');
const models    = require('../models');
const urlencode = require('urlencode');

class LibGameInfo
{
    constructor()
    {

    }

    setDataType(dataType) {this.dataType   = dataType;}

    getDataType() {return this.dataType;}

    async getRiotData(version,language)
    {
        let dataType    = this.getDataType();
        let url         = '';
        switch(dataType)
        {
            case 'champion'     : url   = `http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`; break;
            case 'item'         : url   = `http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/item.json`; break;
            case 'summoner'     : url   = `http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/summoner.json`; break;
            case 'profileicon'  : url   = `http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/profileicon.json`; break;
        }
        let apiDatas  = await axios.get(url, { validateStatus: false });

        return apiDatas;
    }

    async items(req)
    {

    }

    async item(version,language)
    {
        let dbData = {};
        let dataType    = this.getDataType();

        await models.gameInfo.findOne({
            where: {dataType:dataType,version:version,language:language}
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

module.exports = new LibGameInfo();