(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",registerController)
        .controller("LoginController",loginController)
        .controller("ProfileController",profileController);


    function loginController($location,UserService) {

        var vm=this;
        vm.login=login;


        function init() {

        }
        init();

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise.success(function (response) {
                var loginUser=response;
                if(loginUser)
                {
                    $location.url("/user/"+loginUser._id);

                }else
                {vm.error="user not found";}
            });

        }
    }

    function profileController($routeParams,$location,UserService) {
        var vm=this;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;

        var userId=$routeParams['uid'];
        vm.userId=userId;



        function init() {
            var promise=UserService.findUserById(userId);
            promise.success(function (user) {
                vm.user =user;
            });

        }
        init();

        function updateUser(newUser) {
            UserService
              .updateUser(userId,newUser)
              .success(function (user) {
                  if(user!=null)
                  {vm.message="user successfully updated";}
                  else
                  {vm.error="unable to update user";}

              });

        }
        function deleteUser() {
            UserService
                .deleteUser(userId)
                .success(function(user){

                    if(user!=null)
                    {vm.message="user successfully deleted";
                        $location.url("/");

                    }
                    else
                    {vm.error="unable to delete user";}

                });
            //
            // var user=UserService.deleteUser(userId);
            // if(user!=null)
            // {vm.message="user successfully deleted";
            //     $location.url("/");
            //
            // }
            // else
            // {vm.error="unable to delete user";}
        }

    }
    function registerController($location,UserService) {

        var vm=this;
        vm.register=register;

        function init() {

        }
        init();
        function register(user) {

            UserService.findUserByUsername(user.username)
                .success(function (user) {
                   vm.message="User name already taken!"
                })
                .error(function (err) {
                   vm.message="Available";
                });

            UserService.createUser(user)
                .success(function (user) {
                    if(user)
                    {
                        $location.url("/user/"+user._id);
                        vm.message="User created successfully";
                    }
                    else
                        vm.error="User not created successfully!"


                });
            // var user=UserService.createUser(user);
            // if(user)
            // {
            //     $location.url("/user/"+user._id);
            // }
            // else
            //     vm.error="User not created successfully!"
        }

    }

})();