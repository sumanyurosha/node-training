const fs = require('fs')

readData = function(filepath){
    //read file here
    filepath = __dirname + filepath;
    return new Promise(function(resolve,reject){
        let data = fs.readFile(filepath,'utf-8', function(err,data){
            if(err)
                reject(err);
            else
                resolve(JSON.parse(data));
        });
    });
}

writeData = function(filepath, data){
    filepath = __dirname + filepath;
    return new Promise(function(resolve,reject){
        fs.writeFile(filepath, data, function(err,data){
            if(err)
                reject(err);
            else
                resolve('Data written Successfully!');
        });
    });
}

module.exports = {
    readData,
    writeData
}

/*
[
    {
        "id" : 1,
        "firstName" : "Sumanyu",
        "secondName" : "Rosha"
    },
    {
        "id" : 2,
        "firstName" : "John",
        "secondName" : "Doe"
    }
]
*/