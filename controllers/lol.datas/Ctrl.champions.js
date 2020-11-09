const models        = require('../../models');
const libConstants  = require('../../libraries/Lib.constants');
const libChampions  = require('../../libraries/Lib.champions');
const libResponse   = require('../../libraries/Lib.response');

class CtrlChampions
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
        //console.log(languageDatas);

        for(let language of languages)
        {
            let riotDatas   = await libChampions.getRiotData(version,language);

            if(riotDatas.status==200)
            {
                let riotiData = riotDatas.data;
                let hasItem   = await libChampions.hasItem(version,language);

                if(hasItem)
                {
                    let sets    = {datas: riotiData};
                    let where   = {where:{version:version,language:language}};

                    await models.champions.update(sets,where);
                }
                else
                {
                    let sets    = {
                        version:version,
                        language:language,
                        datas:riotiData
                    }

                    await models.champions.create(sets);
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

module.exports = new CtrlChampions();