/**
 * Created by monica on 2/13/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",profileController);
    
    function profileController($routeParams,UserService) {
        var vm=this;
        var userId=$routeParams['uid'];

        vm.updateUser=updateUser;

        
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
        
    }
    
    
})();