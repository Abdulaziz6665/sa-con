const { pg } = require('../../../settings/pg/pg')

const INSERT_CONTACTS = `
    insert into user_contacts(user_username, user_phone, user_email, contacts_id) values ($1, $2, $3, $4)
    ;
`

const FIND_USER_CONTACTS = `
    select distinct
        c.user_id,
        c.user_username,
        c.user_phone,
        c.user_email
    from
        user_contacts as c
    join users as u on $1 = c.contacts_id
    order by c.user_username
    ;
`

const DELETE_CONTACT = `
    delete from 
        user_contacts
    where user_id = $1 returning *
    ;
`

async function routeContacts (req, res) {
    const {data, name, phone, email } = req.body

    try {
        if (name && phone) {
            await pg(INSERT_CONTACTS, name, phone, email, data.user_id)
        }
            const result = await pg(FIND_USER_CONTACTS, data.user_id)
            res.send(result)
     } catch (e) {
            console.log(e.message)
     }
}

async function deleteContacts (req, res) {
    const { del, data } = req.body
    try {
        await pg(DELETE_CONTACT, del)
        const result = await pg(FIND_USER_CONTACTS, data.user_id)
        res.send(result)
    } catch (e){}
}

module.exports.routeContacts = routeContacts
module.exports.deleteContacts = deleteContacts