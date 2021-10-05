const { response } = require('express')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//http://expressjs.com/
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const pubDirPath = path.join(__dirname, '../public/')
//create a custom directories for hbs
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// set up handlebars engine and views location
//https://www.npmjs.com/package/hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)//point express to the custom views directory
hbs.registerPartials(partialsPath)

//set up static directory to server
app.use(express.static(pubDirPath))

// // send back html items
// app.get('', (req, res) => { //req: request, res: response
//     res.send('<h1>Weather</h1>') // send info back to the requester
// })

// get the index dynamically
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jenn Debono'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jenn Debono'
    })
})

// sending JSON as object or an array
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'this is a very helpful message about things with words',
        title: 'Help',
        name: 'Jenn Debono'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Address required' })
    } else {
        geocode(req.query.address, (error, { lat, long, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(long, lat, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    //address: req.query.address
                })
            })
        })
    }
})



// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({ error: 'Search term required' })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jenn Debono',
        errorMessage: 'Help article not found'
    })
})

//404 error handling: page not found
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jenn Debono',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})