const Models                = require('../../Models');
const LibMatchList          = require('../../libraries/Lib.match.list');
const LibResponse           = require('../../libraries/Lib.response');
const LibRequest            = require('../../libraries/Lib.request');
const CtrlBase              = require('./Ctrl.base');

class CtrlMatchList extends CtrlBase
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
        let accountId   = req.params.id; // accountId

        let apiResult   = await LibMatchList.getApi(region,accountId);

        if(apiResult.status==404)
        {
            LibResponse.responseError(res,apiResult.status,'no datas');
            return false;
        }

        LibResponse.responseData(res,apiResult.data.matches);
    }

    async post(req,res)
    {
        let region      = LibRequest.getRegion(req);
        let accountId   = LibRequest.post(req,'id');
        let apiResult   = await LibMatchList.getApi(region,accountId);
        let apiDatas    = apiResult.data;
        if(apiResult.status==404)
        {
            LibResponse.responseError(res,apiResult.status,'no datas');
            return false
        }
        //console.log(apiDatas)

        for(let data of apiDatas.matches)
        {
            let where   = {accountId:accountId,gameId:data.gameId};
            let row;
            await Models.matchList.findOne({where:where}).then(
                (result)=>{
                    if(result)
                    {
                        row   = result.dataValues;
                    }
                    else
                    {
                        row   = false;
                    }
                }
            );

            // 수정
            if(!row)
            {
                let sets    = {
                    accountId:accountId,
                    gameId:data.gameId,
                    datas:data
                };
                await Models.matchList.create(sets);
            }
        }

        LibResponse.responseUpdate(res,accountId,'등록됐습니다.');
    }

    async put(req,res,next)
    {

    }

    async delete(req,res,next)
    {

    }
}

module.exports = new CtrlMatchList();