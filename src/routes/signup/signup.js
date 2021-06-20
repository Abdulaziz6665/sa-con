const { pg } = require('../../../settings/pg/pg')

const INSERT = `
    insert into users (user_username, user_password) values ($1, crypt($2, gen_salt('bf'))) returning user_id
    ;
`

async function routeSignup (req, res) {
    const { username, password } = req.body
    
    try {
        const response = await pg(INSERT, username, password)
        return res.send({succes: true, json: response[0]})
    } catch (e) {
        console.log(e.message)
        return res.send({mass: 'User alreary exits'})
    }
}

module.exports.routeSignup = routeSignup