class LibRequest
{
    constructor()
    {

    }

    getPlatformId(req)
    {
        return req.headers.platformid;
    }

    getSummonerName(req)
    {
        return req.body.summonerName;
    }

    post(req,key)
    {
        return req.body[key];
    }
}

module.exports = new LibRequest();