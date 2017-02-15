(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",userService);
    
    function userService() {
        var users=[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
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
            var id=users[users.length - 1]._id;
            users.push({_id:(Number(id)+1), username:user.username , password:user.password ,firstName:user.firstName ,lastName:user.lastName});
            return users[users.length - 1];
        }

        function findUserById(userId) {
            for(var u in users)
            {
                if(users[u]._id==userId)
                {  return users[u];}

            }
            return null;

        }

        function findUserByUsername(username) {
            for(var u in users)
            {
                if(users[u].username==username)
                {  return users[u];}

            }
            return null;

        }

        function findUserByCredentials(username,password) {
            for(var u in users)
            {
                if(users[u].username==username && users[u].password==password)
                {  return users[u];}

            }
            return null;

        }

        function updateUser(userId,user) {
            for(var u in users)
            {
                if(users[u]._id==userId)
                {  users[u].firstName=user.firstName;
                    users[u].lastName=user.lastName;
                    return users[u];}

            }
            return null;
        }

        function deleteUser(userId) {
            for(var u in users)
            {
                if(users[u]._id==userId)
                {
                    users.splice(users.indexOf(users[u]),1);
                    return true;
                }

            }
            return null;

        }



    };
})();