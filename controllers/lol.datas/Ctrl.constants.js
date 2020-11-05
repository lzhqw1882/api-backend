const models        = require('../../models');
const libConstants  = require('../../libraries/Lib.constants');
const libResponse   = require('../../libraries/Lib.response');

class CtrlConstants
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
        let id        = req.params.id;
        let riotDatas = await libConstants.getRiotData(id);
        let hasItem, riotiData, sets, where;

        if(riotDatas.status==200)
        {
            riotiData = riotDatas.data;
            hasItem   = await libConstants.hasItem(id);

            if(hasItem)
            {
                sets    = {datas: riotiData};
                where   = {where:{title:id}};

                models.constants.update(sets,where);
            }
            else
            {
                sets = {title: id, datas: riotiData};

                models.constants.create(sets);
            }

        }

        libResponse.responseUpdate(res,id,'Success update constants');
    }

    async put(req,res,next)
    {
        let id        = req.params.id;
        let riotDatas  = await libConstants.getRiotData(id);
        let riotiData, sets, where;

        if(riotDatas.status==200)
        {
            riotiData   = riotDatas.data;

            sets    = {datas: riotiData};
            where   = {where:{title:id}};

            models.constants.update(sets,where);
        }

        libResponse.responseUpdate(res,id,'Success update constants');
    }

    async delete(req,res,next)
    {

    }
}

module.exports = new CtrlConstants();