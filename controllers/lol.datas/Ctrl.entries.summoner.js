const Models                = require('../../Models');
const LibEntriesSummoner    = require('../../libraries/Lib.entries.summoner');
const LibResponse           = require('../../libraries/Lib.response');
const LibRequest            = require('../../libraries/Lib.request');
const CtrlBase              = require('./Ctrl.base');

class CtrlEntriesSummoner extends CtrlBase
{
    constructor()
    {
        super();
    }

    async index(req,res,next)
    {
        //LibResponse.responseDatas(res,[]);
    }

    async get(req,res)
    {
        let region      = LibRequest.getRegion(req);
        let summonerId  = req.params.id;
        let apiResult   = await LibEntriesSummoner.getApi(region,summonerId);

        if(apiResult.status==404)
        {
            LibResponse.responseError(res,apiResult.status,'no datas');
            return false;
        }

        LibResponse.responseData(res,apiResult.data);
    }

    async post(req,res)
    {
        let region      = LibRequest.getRegion(req);
        let summonerId  = LibRequest.post(req,'id');
        let apiResult   = await LibEntriesSummoner.getApi(region,summonerId);
        let apiDatas    = apiResult.data;
        if(apiResult.status==404)
        {
            LibResponse.responseError(res,apiResult.status,'no datas');
        }

        for(let data of apiDatas)
        {
            let hasData = LibEntriesSummoner.hasRow(data.leagueId,summonerId,data.queueType)

            if(!hasData)
            {
                let sets    = {
                    leagueId:data.leagueId,
                    summonerId:summonerId,
                    queueType:data.queueType,
                    datas:data
                };
                await Models.entriesBySummoner.create(sets);
            }
        }

        LibResponse.responseUpdate(res,summonerId,'등록됐습니다.');
    }

    async put(req,res,next)
    {

    }

    async delete(req,res,next)
    {

    }
}

module.exports = new CtrlEntriesSummoner();