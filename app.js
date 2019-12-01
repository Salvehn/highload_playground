const request=require('request')
const express=require('express')
const bodyParser=require('body-parser')
const app = express();
const shell = require('shelljs');
shell.env["PORT"] = "80";
const pjson = require('prettyjson');
const port = process.env.PORT ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const APIKey='96334996f55e14f3b68619156d20d55d'
const APIKey2='c53e7e5e816246aca797e5cffde5d5fb'
app.get('/',function(req,res,err){
    console.log('root')
  res.send(JSON.stringify({description:'Available metods: - current/{cityname} \n - forecast/{cityname}'}))
    
})
//https://api.openweathermap.org/data/2.5/weather?q=London&appid=d8a40a1b5bda6de02b8492911d0955e4
app.get('/:method/:city',(req,res,err)=>{
    request({
        method:'GET',
        uri:`http://api.weatherbit.io/v2.0/${req.params.method}${(req.params.method=='forecast'?('/hourly'):(''))}?city=${req.params.city}&key=${APIKey2}`
    },(err,re,data)=>{
       
        res.send(pjson.render(JSON.parse(data).data[0]))
      
        
    })  
})
app.listen(port,()=>{
    console.log('listening on port: '+port)
})
