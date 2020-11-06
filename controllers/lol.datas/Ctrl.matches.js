const Models        = require('../../Models');
const LibMatches    = require('../../libraries/Lib.matches');
const LibResponse   = require('../../libraries/Lib.response');
const LibRequest    = require('../../libraries/Lib.request');
const CtrlBase      = require('./Ctrl.base');

class CtrlMatches extends CtrlBase
{
    constructor()
    {
        super();
    }

    async get(req,res)
    {
        let platformId  = LibRequest.getPlatformId(req);
        let gameId  = req.params.id; // gameId

        let apiResult   = await LibMatches.getApi(platformId,gameId);

        if(apiResult.status==404)
        {
            LibResponse.responseError(res,apiResult.status,'no datas');
            return false;
        }

        LibResponse.responseData(res,apiResult.data);
    }

    async post(req,res)
    {
        let platformId      = LibRequest.getPlatformId(req);
        let gameId      = LibRequest.post(req,'id');
        let apiResult   = await LibMatches.getApi(platformId,gameId);
        let apiDatas    = apiResult.data;
        let message     = '';

        if(apiResult.status==404)
        {
            LibResponse.responseError(res,apiResult.status,'no datas');
            return false
        }

        let row = await LibMatches.getRow(apiDatas.gameId);
        console.log(gameId);

        if(row)
        {
            let sets    = {datas: apiDatas};

            await Models.matches.update(sets, { where: { gameId:gameId } });

            message = '수정됐습니다.';
        }
        else
        {
            let sets    = {
                gameId:gameId,
                datas:apiDatas
            };
            await Models.matches.create(sets);
            message = '등록됐습니다.';
        }

        LibResponse.responseUpdate(res,gameId,message);
    }

    async put(req,res,next)
    {

    }

    async delete(req,res,next)
    {

    }
}

module.exports = new CtrlMatches();