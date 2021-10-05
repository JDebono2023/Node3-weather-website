
const request = require('request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

//const url = 'http://api.weatherstack.com/current?access_key=87b13091c7bff7ad256fe030418fe9ca&query=37.8267,-122.4233'

const forecast = (long, lat, callback) => {
    // make URL the request
    const url = 'http://api.weatherstack.com/current?access_key=87b13091c7bff7ad256fe030418fe9ca&query=' + lat + ',' + long + ''


    //request({ url: url, json: true }, (error, response) => {
    //     request({ url, json: true }, (error, { body }) => {
    //         if (error) {
    //             callback(`Unable to connect to weather services`, undefined)
    //         } else if (response.body.error) {
    //             callback(`Unable to find location. Search again`, undefined)
    //         } else {
    //             callback(undefined, `It is currrently ${response.body.current.weather_descriptions[0]}. The temp is ${response.body.current.temperature} degrees, feeling like ${response.body.current.feelslike} degrees with the humidex.`)
    //         }
    //     })
    // }

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to weather services`, undefined)
        } else if (body.error) {
            callback(`Unable to find location. Search again`, undefined)
        } else {
            callback(undefined, `It is currrently ${body.current.weather_descriptions[0]}. The temp is ${body.current.temperature} degrees, feeling like ${body.current.feelslike} degrees with the humidex.`)
        }
    })
}
// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })


module.exports = forecast



