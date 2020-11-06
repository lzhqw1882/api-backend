const Models        = require('../../Models');
const LibSummoners  = require('../../libraries/Lib.summoners');
const LibResponse   = require('../../libraries/Lib.response');
const LibRequest    = require('../../libraries/Lib.request');
const CtrlBase      = require('./Ctrl.base');
const Moment        = require('moment');

class CtrlSummoners extends CtrlBase
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
        let platformId          = LibRequest.getPlatformId(req);
        let summonerName    = req.params.id;
        let apiResult       = await LibSummoners.getApi(platformId,summonerName);

        if(apiResult.status==404)
        {
            LibResponse.responseError(res,apiResult.status,'no datas');
            return false;
        }
        let moment  = Moment(apiResult.data.revisionDate);
        //console.log(apiResult.data.revisionDate);
        console.log(moment.format('YYYY-MM-DD HH:mm:ss'));
        LibResponse.responseData(res,apiResult.data);
    }

    async post(req,res)
    {
        let platformId      = LibRequest.getPlatformId(req);
        let summonerName= LibRequest.post(req,'id');
        let apiResult   = await LibSummoners.getApi(platformId,summonerName);
        let apiDatas    = apiResult.data;
        let message     = '';

        if(apiResult.status==404)
        {
            message = 'no datas';
            LibResponse.responseError(res,apiResult.status,message);
            return false;
        }

        let summonerId   = apiDatas.id;

        let datas   = await LibSummoners.getSummonerBySummonerId(summonerId);

        if(datas)
        {
            await LibSummoners.update(summonerId,apiDatas);

            message = '수정됐습니다.';
        }
        else
        {
            await LibSummoners.store(summonerId,platformId,apiDatas);

            message = '등록됐습니다.';
        }

        LibResponse.responseUpdate(res,summonerId,message);
    }

    async put(req,res,next)
    {

    }

    async delete(req,res,next)
    {

    }
}

module.exports = new CtrlSummoners();