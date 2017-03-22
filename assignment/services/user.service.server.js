module.exports=function(app){

    var userModel =require("../model/user/user.model.server");

    app.get("/api/user",findUser);
    app.post("/api/user",createUser);
    app.get("/api/user/:uid",findUserById);
    app.put("/api/user/:uid",updateUser);
    app.delete("/api/user/:uid",deleteUser);

    // var users=[
    //     {_id: "123", username: "alice",   email:"alice@gmail.com" ,   password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",     email:"bob@gmail.com" , password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",  email:"charly@gmail.com" , password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi",email:"jannuzi@gmail.com" , password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];

    function createUser(req,res) {

        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


        // var user=req.body;
        // var id=users[users.length - 1]._id;
        // users.push({_id:(Number(id)+1), username:user.username ,email:user.email, password:user.password ,firstName:user.firstName ,lastName:user.lastName});
        // res.json(users[users.length - 1]);
    }

    function findUserById(req,res) {
        var userId=req.params.uid;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var user=users.find(function (u) {
        //     return u._id==userId;
        //
        // });
        // res.json(user);

    }

    function findUser(req,res) {

        var username=req.query['username'];
        var password=req.query['password'];
        if(username&&password)
        {
            findUserByCredentials(req,res);

        }
        else if(username)
        {findUserByUsername(req,res);}

    }

    function findUserByUsername(req,res) {
        var username=req.query['username'];


        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);

            }, function (error) {

                res.sendStatus(500).send(error);
            });


        // var user=users.find(function (u) {
        //     return u.username==req.query.username;
        // });
        // if(user){
        //     res.json(user);
        // }else
        // {
        //     res.sendStatus(404);}
    }

    function findUserByCredentials(req,res) {

        var username=req.query['username'];
        var password=req.query['password'];


        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                if(user.length==0)
                { res.json();
                }

                res.json(user);

            }, function (error) {

                res.sendStatus(500).send(error);
            });

        // var user= users.find(function (u) {
        //     return u.username==username && u.password==password;
        // });
        // res.json(user);
    }




    function updateUser(req,res) {
        var userId=req.params.uid;
        var user=req.body;
        userModel
            .updateUser(user,userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // for(var u in users)
        // {
        //     if(users[u]._id==userId)
        //     {  users[u].firstName=user.firstName;
        //         users[u].lastName=user.lastName;
        //         users[u].email=user.email;
        //         res.json(user[u]);
        //         return ;}
        //
        // }
    }

    function deleteUser(req,res) {
        var userId=req.params.uid;

        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // for(var u in users)
        // {
        //     if(users[u]._id==userId)
        //     {
        //         users.splice(users.indexOf(users[u]),1);
        //         res.json(users);
        //         return;
        //     }
        //
        // }

    }
};