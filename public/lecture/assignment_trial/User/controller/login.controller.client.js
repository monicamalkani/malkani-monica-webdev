(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",loginController);

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

})();