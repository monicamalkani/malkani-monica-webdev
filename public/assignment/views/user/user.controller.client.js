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
            var user = UserService.findUserByCredentials(user.username, user.password);
            if(user)
            {
                $location.url("/user/"+user._id);

            }else
            {vm.error="user not found";}
        }
    }

    function profileController($routeParams,$location,UserService) {
        var vm=this;
        var userId=$routeParams['uid'];
        vm.userId=userId;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;

        function init() {
            var user=UserService.findUserById(userId);
            vm.user =user;
        }
        init();
        function updateUser(newUser) {
            var user=UserService.updateUser(userId,newUser);
            if(user!=null)
            {vm.message="user successfully updated";}
            else
            {vm.error="unable to update user";}

        }
        function deleteUser() {

            var user=UserService.deleteUser(userId);
            if(user!=null)
            {vm.message="user successfully deleted";
                $location.url("/");

            }
            else
            {vm.error="unable to delete user";}
        }

    }
    function registerController($location,UserService) {

        var vm=this;
        vm.register=register;
        function init() {

        }
        init();
        function register(user) {
            var user=UserService.createUser(user);
            if(user)
            {
                $location.url("/user/"+user._id);
            }
            else
                vm.error="User not created successfully!"
        }

    }

})();