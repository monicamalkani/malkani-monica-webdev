(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
        .controller("NewWebsiteController",NewWebsiteController)
        .controller("EditWebisteController",EditWebisteController);

    function WebsiteListController($routeParams,WebsiteService) {
        var vm=this;
        var userId=$routeParams['uid'];

        function init() {
            var websites=WebsiteService.findWebsitesByUser(userId);
            vm.websites=websites;
        }
        init();

        vm.userId=userId;

    }
    function NewWebsiteController($routeParams,WebsiteService,$location) {

        var vm=this;
        vm.createWebsite=createWebsite;

        var userId=$routeParams['uid'];

        function init() {
            var websites=WebsiteService.findWebsitesByUser(userId);
            vm.websites=websites;
        }
        init();

        var websiteId=$routeParams['wid'];


        vm.userId=userId;
        vm.website=WebsiteService.findWebsiteById(websiteId);



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

        var vm=this;
        vm.delete=websitedelete;
        vm.updateWebsite=updateWebsite;

        var userId=$routeParams['uid'];
        var websiteId=$routeParams['wid'];

        function init() {
            vm.website=WebsiteService.findWebsiteById(websiteId);

        }
        init();
        var websites=WebsiteService.findWebsitesByUser(userId);
        vm.websites=websites;




        vm.userId=userId;



        function websitedelete() {
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
            var updatedwebsite=WebsiteService.updateWebsite(websiteId,website);
            if(updatedwebsite)
            {
                $location.url("/user/"+userId+"/website");
            }
            else
            {}
        }


    }




})();