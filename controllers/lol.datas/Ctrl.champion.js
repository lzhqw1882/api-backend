const models        = require('../../models');
const libConstants  = require('../../libraries/Lib.constants');
const libGameInfo  = require('../../libraries/Lib.game.info');
const libChampion   = require('../../libraries/Lib.champion');
const libResponse   = require('../../libraries/Lib.response');
const LibRequest    = require('../../libraries/Lib.request');

class CtrlChampion
{
    constructor()
    {
    }

    async index(req,res,next)
    {
        libResponse.responseDatas(res,[]);
    }

    async get(req,res,next)
    {
        libResponse.responseData(res,[]);
    }

    async post(req,res,next)
    {
        libGameInfo.setDataType('champion');
        let versionRows     = await libConstants.item('versions');
        let version         = versionRows.datas[0];
        let language        = LibRequest.post(req,'language');
        let championsRow    = await libGameInfo.item(version,language);
        let datas           = championsRow.datas.data;
        let sets        = [];

        for(let dataKey in datas) {
            let data        = datas[dataKey];
            let id          = data.id;
            let key         = data.key;
            let riotDatas   = await libChampion.getRiotData(version,language,id);

            if(riotDatas.status==200)
            {
                let riotiData = riotDatas.data;

                sets.push({
                    id  : id,
                    key : key,
                    version:version,
                    language:language,
                    datas:riotiData
                });
            }
        }

        await models.champion.bulkCreate(sets);

        libResponse.responseUpdate(res,version,'Success update champion');
    }

    async put(req,res,next)
    {
        
    }

    async delete(req,res,next)
    {

    }
}

module.exports = new CtrlChampion();