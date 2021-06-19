const { pg } = require('../../../settings/pg/pg')

const SQL = `
    select
        user_username,
        user_password
    from 
        users
;
`

async function routeData (req, res) {
    res.send(await pg(SQL))
}

module.exports.routeData = routeData