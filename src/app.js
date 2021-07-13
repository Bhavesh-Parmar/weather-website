const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//heroku port number env is enviorment number 
const port = process.env.PORT || 3000

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bhavesh Parmar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bhavesh Parmar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Bhavesh Parmar'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        res.send({
            error: "You must need to provide search"
        })
    }else{
        const address = req.query.address
        geocode(address, (error, {longitude, latitude, location} = {})=>{
            if(error)
              return res.send( {error} ) 
              
            //below code is example of callback chaining
            forecast(longitude, latitude, (error, {weather_descriptions, temperature, feelslike} = {}) => {
                if(error)
                    return res.send( {error} )
                res.send({
                    Address:location,
                    Weather: weather_descriptions,
                    temperature,feelslike
                })
            })
        })
    }
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia'
    // })
})

app.get('/products', (req, res) => {
    
    if(!req.query.address){
        res.send({
            error: "You must need to provide search"
        })
    }else{
        const address = req.query.address
        geocode(address, (error, {longitude, latitude, location} = {})=>{
            if(error)
              return res.send(error) 
            //console.log("Data ", data)
            //below code is example of callback chaining
            forecast(longitude, latitude, (error, {weather_descriptions, temperature, feelslike} = {}) => {
                if(error)
                    return res.send(error)
                res.send({
                    Address:location,
                    Weather: weather_descriptions,
                    temperature,feelslike
                })
            })
        })
    }
    // console.log(req.query)
    console.log(req.query.search)
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})