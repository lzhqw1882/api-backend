class LibRequest
{
    constructor()
    {

    }

    getRegion(req)
    {
        return req.headers.region;
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