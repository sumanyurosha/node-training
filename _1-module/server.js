var http = require('http')
var fs = require('fs')

const localhost = '127.0.0.1'
var readDataFromFile = function(filename){
    var content = "dummy";
    return new Promise(function(resolve,reject){
        //do async job
        var filepath = '.' + filename;
        fs.readFile(filepath,'utf-8',function(err,data){
            if(err)
            {
                console.log('err in readfile')
                reject(err)
            }
            else
            {
                console.log('data read in readfile ' + data);
                resolve((data))
            }    
        })
    })
    
}


var server = http.createServer(function(req,res){
    var contentType = req.url;
    var filename = req.url;
    //console.log(filename)
    if(contentType.includes('json'))
    {
        contentType = 'application/json'
        //console.log('json file found')
    }    
    else if(contentType.includes('html'))
    {
        contentType = 'text/html'
        //console.log('html file found')
    }
    else
    {    
        contentType = 'text/plain'
       // console.log('other')
    }
    res.writeHead(200,{'Content-Type' : contentType});
    data = readDataFromFile(filename);
    data.then(function(data){
        console.log('then : ' + data)
        res.write(data)
        res.end()
        }, function(err){
            console.log("err is: " + err)
            // res.write(data)
            // res.end()
    });
    
});

server.listen(3000,localhost);
console.log('Listening to port 3000 on localhost');