const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
//express is a function like object
const app = express()
const port = process.env.PORT || 3000

//getting all paths
const publicdirecaddress = path.join(__dirname,"../public");
const viewspath = path.join(__dirname,'../tempaltes/views')
const partialsPath = path.join(__dirname,'../tempaltes/partials')
//set is used to set properties of express
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)
//'use' is use to customise server
//express.static will have path of directory which we want to open in server
app.use(express.static(publicdirecaddress))

//route for hbs
app.get('',(req,res)=>{
  res.render('index',{
    name:'Divyam',
    app:'weather app'
    ,title:'Weather'
  })
})
app.get('/about',(req,res)=>{
  res.render('about',{
    name:'Divyam',
    title:'About me'
  })
})
app.get('/product',(req,res)=>{
  if(!req.query.search){
    return res.send({
      message:'You must provide search term'
    })
  }
    res.send({products:[]})

})
app.get('/help',(req,res)=>{
  res.render('help',{
    message:'feel good to help you sir !',
    title:'Help',
    name:'Divyam'
  })
})
//'' consist request and server function will have 2 varibales req -> which request and
//res what response to give
//send will send data that we want send as a response, it can be object, string and then it will convert that data into json
app.get('/weather',(req,res)=>{
  if(!req.query.address)
  {
    return res.send({error:'Please provide address'})
  }
  geocode(req.query.address,(error,{latitude,longitude,name}={})=>{
    if(error)
    {
      return res.send({error:error})
    }
    forecast(longitude,latitude,(error,{type,ctemp,ftemp})=>{
      if(error)
      {
        return res.send({error})
      }
      else {
        res.send({
          location:name,
          forecast: type,
          curr_temp : ctemp,
          feel_temp:ftemp
        })
      }
    })


  })
  // res.send({
  //   place:'india',
  //   temperature:41,
  //   forecast:'rainy',
  //   address:req.query.address
  // });
})
app.get('/help/*',(req,res)=>{
  res.render('error404',{
    message:'Help article not found'
    ,name:'Divyam',
    title:'404'
  })
})

app.get('*',(req,res)=>{
  res.render('error404',{
    message:'Page not found'
    ,name:'Divyam',
    title:'404'
  })
})

//to start the server
app.listen(port, ()=>{
  console.log('server is on port = '+port);
})
