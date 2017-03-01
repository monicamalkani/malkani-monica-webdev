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
            }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);

        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);


        }

        function findUserByCredentials(username,password) {

           return $http.get("/api/user?username="+username+"&password="+password);

        }

        function updateUser(userId,user) {
           return $http.put("/api/user/"+userId, user);

        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);


        }



    };
})();