const { pg } = require('../../../settings/pg/pg')

const FIND_USER = `
    select
        user_id
    from 
        users
    where user_username = $1 and user_password = crypt($2, user_password);
`

async function routeLogin (req, res) {
    const { username, password } = req.body
    
    try {
        const result = await pg(FIND_USER, username, password)
        return res.send({res: result[0], succes: true, mass: 'user not found'})
    } catch (e) {
        console.log(e.message)
        return res.send({mass: 'User alreary exits'})
    }
}

module.exports.routeLogin = routeLogin