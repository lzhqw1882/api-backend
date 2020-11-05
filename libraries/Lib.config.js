const env               = process.env.NODE_ENV || 'development';
const configRiot        = require(__dirname + '/../config/riot.config.json')[env];
const configDbDefault   = require(__dirname + '/../config/db.config.json')[env];

class LibConfig
{
    constructor()
    {

    }
    getRiot(key)
    {
        return configRiot[key];
    }

    getDefaultDb(key)
    {
        return configDbDefault[key];
    }
}

module.exports = new LibConfig();