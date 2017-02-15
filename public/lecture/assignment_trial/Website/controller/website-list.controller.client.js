(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController);
    
    function WebsiteListController($routeParams,WebsiteService) {
        var userId=$routeParams['uid'];
        var websites=WebsiteService.findAllWebsites(userId);
        var vm=this;
        vm.websites=websites;
        vm.userId=userId;
    }
})();