const request = require('request');

const forecast = (long,lat,callback)=>
{
  //query units=f is made to get temperature in farheniterate
  const url ='http://api.weatherstack.com/current?access_key=efe678e5a7d13d7ed734108eb6508582&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)+'&units=f';
  request({url,json:true},(error,{body})=>{
    if(error){
      callback('Unable to connect to weather services',undefined)
    }
    else if(body.success === false)
    {
      callback('Loaction not found. Try another search.',undefined);
    }
    else {
            callback(undefined,{type:body.current.weather_descriptions[0],ctemp:body.current.temperature,ftemp:body.current.feelslike})
    }

  })

}

module.exports =forecast
