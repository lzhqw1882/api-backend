const models        = require('../../models');
const libConstants  = require('../../libraries/Lib.constants');
const libGameInfo   = require('../../libraries/Lib.game.info');
const libResponse   = require('../../libraries/Lib.response');

class CtrlGameInfo
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
        let versionRows     = await libConstants.item('versions');
        let version         = versionRows.datas[0];
        let languageRows    = await libConstants.item('languages');
        let languages       = languageRows.datas;
        let dataType        = req.url.split('/')[2];
        libGameInfo.setDataType(dataType);

        for(let language of languages)
        {
            let riotDatas   = await libGameInfo.getRiotData(version,language);

            if(riotDatas.status==200)
            {
                let riotiData = riotDatas.data;
                let hasItem   = await libGameInfo.hasItem(version,language);

                if(hasItem)
                {
                    let sets    = {datas: riotiData};
                    let where   = {where:{dataType:dataType,version:version,language:language}};

                    await models.gameInfo.update(sets,where);
                }
                else
                {
                    let sets    = {
                        dataType:dataType,
                        version:version,
                        language:language,
                        datas:riotiData
                    }

                    await models.gameInfo.create(sets);
                }
            }
        }

        libResponse.responseUpdate(res,version,'Success update champions');
    }

    async put(req,res,next)
    {
        
    }

    async delete(req,res,next)
    {

    }
}

module.exports = new CtrlGameInfo();