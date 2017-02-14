(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
        .controller("NewWebsiteController",NewWebsiteController)
        .controller("EditWebisteController",EditWebisteController);

    function WebsiteListController($routeParams,WebsiteService) {
        var userId=$routeParams['uid'];
        var websites=WebsiteService.findWebsitesByUser(userId);
        var vm=this;
        vm.websites=websites;
        vm.userId=userId;

    }
    function NewWebsiteController($routeParams,WebsiteService,$location) {
        var userId=$routeParams['uid'];
        var websites=WebsiteService.findWebsitesByUser(userId);
        var vm=this;
        vm.websites=websites;
        vm.userId=userId;

        var websiteId=$routeParams['wid'];
        vm.website=WebsiteService.findWebsiteById(websiteId);
        vm.createWebsite=createWebsite;

        function createWebsite(userId,newwebsite) {
            websites=WebsiteService.createWebsite(userId,newwebsite);
            if(websites)
            {
                $location.url("/user/"+userId+"/website");
            }
            else
            {}


        }


    }

    function EditWebisteController($routeParams,$location,WebsiteService) {

        var userId=$routeParams['uid'];
        var websites=WebsiteService.findWebsitesByUser(userId);
        var vm=this;
        vm.websites=websites;
        vm.userId=userId;

        var websiteId=$routeParams['wid'];
        vm.website=WebsiteService.findWebsiteById(websiteId);

        vm.delete=websitedelete;
        vm.updateWebsite=updateWebsite;

        function websitedelete(websiteId) {
            var deleted=WebsiteService.deleteWebsite(websiteId);
            if(deleted)
            {
                $location.url("/user/"+userId+"/website");
            }
            else
            {}

        }

        function updateWebsite(website)
        {
            var updatedwebsite=WebsiteService.updateWebsite(website._id,website);
            if(updatedwebsite)
            {
                $location.url("/user/"+userId+"/website");
            }
            else
            {}
        }


    }




})();