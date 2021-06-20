const express = require('express')
const path = require('path')
const cors = require('cors')

const { pg } = require('./settings/pg/pg')
const routes = require('./src/allRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Headers', '*')
    next()
}) 

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
  })
}

app.get('/data', routes.routeData)

app.post('/signup', routes.routeSignup)

app.post('/login', routes.routeLogin)

app.post('/contacts', routes.routeContacts)

app.delete('/contacts', routes.deleteContacts)

app.listen(PORT, () => console.log('server is running ' + PORT))