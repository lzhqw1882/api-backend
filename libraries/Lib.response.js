class LibResponse
{
    constructor()
    {

    }

    responseDatas(res,datas)
    {
        let code    = 200;
        datas   = {
            pagination: {
                total       :'',
                totalPage   :'',
                page        :'',
                perPage     :''
            },
            items:datas
        }

        res.status(code).json(datas);
    }

    responseData(res,datas)
    {
        let code    = 204;

        if(datas)
        {
            code    = 200;
            datas   = {
                item    : datas
            }
        }
        res.status(code).json(datas);
    }

    responseUpdate(res,id,message)
    {
        let code	= 201;
        let datas   = {
            id:id,
            message:message
        };
        res.status(code).json(datas);
    }

    responseError(res,code,message)
    {
        let datas   = {
            message:message
        }

        res.status(code).json(datas);
    }

    responseValidation(res,message,field)
    {
        let code	= 412;

        let datas   = {
            message:message,
            field:field
        }

        res.status(code).json(datas);
    }

    responseRiotResult(result,apiDatas)
    {
        let code;
        let message;
        let items;

        if(result)
        {
            code        = 200;
            message     = 'success';
            items       = apiDatas.data;
        }
        else
        {
            code        = apiDatas.data.status.status_code;
            message     = apiDatas.data.status.message;
            items       = null;
        }
        return  {code:code,message:message,items:items};
    }
}

module.exports = new LibResponse();