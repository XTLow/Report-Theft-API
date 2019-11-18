var express = require('express');
var dataAdapter = require('./data');
var bodyParser = require('body-parser')

const app = express();



app.use(bodyParser.json());

  

const port = 5577;
app.listen(port, () =>{
    console.log('Server started on port : '+port);
});

app.get('/Theft/GetTheft',(req, res) =>{
    console.log('Requested Theft : ' + req.query.latitude + ' ' +req.query.longitude + ' range : '+req.query.range );    
    if(req.query.date != undefined){        
        console.log('Date requested : ' +req.query.date);        
        dataAdapter.DATA.GetTheftByDate(req.query.range,req.query.date,req.query.latitude,req.query.longitude,function(result) {
            res.send(result);
        });   
    }
    else{
        console.log('Date not requested');
        dataAdapter.DATA.GetTheft(req.query.range,req.query.latitude,req.query.longitude,function(result) {
            res.send(result);
        });   
    }
});
app.get('/Theft/GetCount',(req,res) =>{
    console.log('Requested Count');
    var teste = dataAdapter.DATA.GetTheftCount(function(result){
        var count = {count : result};
        res.send(count);
    });
});
app.post('/Theft/PostTheft',(req,res) =>{
    const desc = req.query.descricao;
    const date = req.query.date;
    const hora = req.query.hour;
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const type = req.query.type;    
    console.log(req.query);
    dataAdapter.DATA.RegisterTheft(desc,date,hora,lat,lon,type,function(result){
        if(result){
            res.send('Postado com sucesso');
        }
        else{
            res.send('Falha ao registrar');
        }    
    });
});


