const request = require('request')

const forecast = (longitude, latitude, weatherstack, callback)=>{

    const url = "http://api.weatherstack.com/current?access_key="+ encodeURIComponent(weatherstack) +"&query="+encodeURIComponent(latitude)+","+encodeURIComponent(longitude);//  72.5714
    // console.log(url)
    request({url:url, json:true}, ( error, {body} = {}) => {
        if(error)
            callback("Unable to Connect...")
        else if(body.error){
            callback(body.error.info)
        }
        else{
            callback(undefined,{
                weather_descriptions:body.current.weather_descriptions,
                temperature:body.current.temperature,
                feelslike:body.current.feelslike
            })
        }
        // console.log(response)
        //const data =  JSON.parse(response.body)
        // console.log(data.current)
        // console.log(response.body.current)
    })
}

module.exports = forecast