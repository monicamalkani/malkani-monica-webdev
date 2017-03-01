(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",userService);

    function userService($http) {
        var users=[
            {_id: "123", username: "alice",   email:"alice@gmail.com" ,   password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",     email:"bob@gmail.com" , password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",  email:"charly@gmail.com" , password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi",email:"jannuzi@gmail.com" , password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api={
            "createUser":createUser,
            "findUserById":findUserById,
            "findUserByUsername":findUserByUsername,
            "findUserByCredentials":findUserByCredentials,
            "updateUser":updateUser,
            "deleteUser":deleteUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api/user",user);
            // var id=users[users.length - 1]._id;
            // users.push({_id:(Number(id)+1), username:user.username ,email:user.email, password:user.password ,firstName:user.firstName ,lastName:user.lastName});
            // return users[users.length - 1];
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
            // for(var u in users)
            // {
            //     if(users[u]._id==userId)
            //     {  return users[u];}
            //
            // }
            // return null;

        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
            // for(var u in users)
            // {
            //     if(users[u].username==username)
            //     {  return users[u];}
            //
            // }
            // return null;

        }

        function findUserByCredentials(username,password) {

           return $http.get("/api/user?username="+username+"&password="+password);
            // for(var u in users)
            // {
            //     if(users[u].username==username && users[u].password==password)
            //     {  return users[u];}
            //
            // }
            // return null;

        }

        function updateUser(userId,user) {
           return $http.put("/api/user/"+userId, user);
            // for(var u in users)
            // {
            //     if(users[u]._id==userId)
            //     {  users[u].firstName=user.firstName;
            //         users[u].lastName=user.lastName;
            //         users[u].email=user.email;
            //         return users[u];}
            //
            // }
            // return null;
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);

            // for(var u in users)
            // {
            //     if(users[u]._id==userId)
            //     {
            //         users.splice(users.indexOf(users[u]),1);
            //         return true;
            //     }
            //
            // }
            // return null;

        }



    };
})();