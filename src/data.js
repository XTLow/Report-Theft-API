var Firebird = require('node-firebird');

class DATA{
        static async GetTheft(km,lat,lon,callback) {
            var options = this.GetFbParams();               
                    
            Firebird.attach(options, function(err, db) { 
                if (err){
                    console.log(err);
                }                    
                 db.query('SELECT * FROM(SELECT id,(6371 * acos(cos( '+lat+'/57.2958 ) * cos( LAT/57.2958 ) * cos( LNG/57.2958 - '+lon+'/57.2958 ) + sin( '+lat+'/57.2958 ) * sin( LAT/57.2958  ))) AS distance, descricao, DATA, TYPE_ID, HORA FROM REPORT) WHERE distance < ? ORDER BY distance ',[km],function(err,result){                                                                                             
                    if(result != undefined){
                        for (let index = 0; index < result.length; index++) {
                            result[index].DESCRICAO = result[index].DESCRICAO.toString('utf8');                             
                        }                        
                    }          
                    else{
                        console.log(err);
                    }          
                    db.detach();
                    return callback(result);
                });                        
            });            
        };

        static async GetTheftByDate(km,date,lat,lon,callback) {
            var options = this.GetFbParams();               
                    
            Firebird.attach(options, function(err, db) { 
                if (err){
                    console.log(err);
                }                    
                 db.query("SELECT * FROM(SELECT id,(6371 * acos(cos( "+lat+"/57.2958 ) * cos( LAT/57.2958 ) * cos( LNG/57.2958 - "+lon+"/57.2958 ) + sin( "+lat+"/57.2958 ) * sin( LAT/57.2958  ))) AS distance, descricao, DATA, TYPE_ID, HORA FROM REPORT) WHERE distance < "+km+" and DATA >= '2010-12-23' ORDER BY distance; ",[],function(err,result){                                                                                             
                    if(result != undefined){
                        for (let index = 0; index < result.length; index++) {
                            result[index].DESCRICAO = result[index].DESCRICAO.toString('utf8');                             
                        }                        
                    }          
                    else{
                        console.log(err);
                    }          
                    db.detach();
                    console.log(result);
                    return callback(result);
                });                        
            });            
        };

     static RegisterTheft(desc,date,hora,lat,lon,type,callback){
        var options = this.GetFbParams(); 
        Firebird.attach(options, function(err, db) { 
            if (err){
                console.log(err);
            }                    
             db.execute("INSERT INTO REPORT (ID,LAT,LNG,DATA,HORA,DESCRICAO,TYPE_ID) VALUES (?,?,?,?,?,?,?);",[1,lat,lon,date,hora,desc,type],function(err,result){                                                                                                              
                var ret = true;
                if(err != undefined){
                    ret = false;
                }                          
                db.detach();                
                return callback(ret);
            });                        
        });  
     };
    static GetTheftCount(callback){
        var options = this.GetFbParams(); 
                                       
        Firebird.attach(options, function(err, db) { 
            if (err){
                console.log(err);
            }                    
             var data = new Date().toLocaleDateString();            
             db.query("SELECT * FROM REPORT WHERE DATA = ? ; ",[data],function(err,result){                                                                                             
                var counter = 0;
                if(result != undefined){
                    counter = result.length;       
                }                 
                db.detach();    
                console.log(counter);            
                return callback(counter);
            });                        
        });   
    };
    static GetFbParams(){
        var options = {}; 
        options.host = '127.0.0.1';
        options.port = 3050;
        options.database = 'C:\\Users\\Raphael\\Documents\\Databases\\REPORTTHEFT.FDB';
        options.user = 'SYSDBA';
        options.password = 'masterkey';
        options.lowercase_keys = false; 
        options.role = null;            
        options.pageSize = 4096;     
        return options;
    }
}
module.exports ={
    DATA,
}
