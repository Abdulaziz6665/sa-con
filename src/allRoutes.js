const { routeData } = require('./routes/data/data')
const { routeSignup } = require('./routes/signup/signup')
const { routeLogin } = require('./routes/login/login')
const { routeContacts, deleteContacts } = require('./routes/contacts/contacts')

module.exports = {
    routeData,
    routeSignup,
    routeLogin,
    routeContacts,
    deleteContacts
}