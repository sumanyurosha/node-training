const express = require('express')
const utility = require('./utility')

let app = express();

const filePath = '/data/users.json';

app.use(express.static('./public'));

app.get("/", (req, res) => {
    res.redirect('/index.html');
});

app.get("/users", (req, res) => {

    data = utility.readData(filePath);
    data.then(function(data){
        console.log('data is : ' + data);
        res.write(JSON.stringify(data));
        res.end();
    }, function(err){
        console.log('error is: ' + err);
    }).catch()
    {
        

    };
    

});

app.get("/users/:id", (req, res) => {

    var id = req.params.id;
    console.log("we are here")
    data = utility.readData(filePath);
    data.then(function(data){
        let user = "";
        for(i = 0; i<data.length; i++){
            if(id == data[i].id)
            {
                user = data[i];
                break
            }
        }
        if(user == "")
            user = "USER NOT FOUND!";
        res.write(JSON.stringify(user));
        res.end();
    }, function(err){
        console.log('error is: ' + err);
    });

});

app.post("/users", (req, res) => {

    let user = {};    

    let data = utility.readData(filePath);
    data.then(function(data){
        console.log('data is : ' + data);
        let newId = 1;
        for(i = 0; i<data.length; i++){
            newId = data[i].id;
        }
        user.id = newId+1;
        user.firstName = req.query.firstName;
        user.lastName = req.query.secondName;
        data.push(user);
        console.log(data);
        let msg = utility.writeData(filePath, JSON.stringify(data));
        msg.then(function(data){
            res.write(data);
            res.end();
        }, function(err){
            console.log('err is: ' + err);
        })

    }, function(err){
        console.log('error is: ' + err);
    }).catch()
    {
        

    };    

})

app.listen(3000,'localhost');
console.log('server is active now');