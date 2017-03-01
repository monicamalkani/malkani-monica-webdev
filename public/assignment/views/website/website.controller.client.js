(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
        .controller("NewWebsiteController",NewWebsiteController)
        .controller("EditWebisteController",EditWebsiteController);

    function WebsiteListController($routeParams,WebsiteService) {
        var vm=this;
        var userId=$routeParams['uid'];
        vm.userId=userId;

        function init() {
            WebsiteService.findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites=websites;
                });
        }
        init();

    }
    function NewWebsiteController($routeParams,WebsiteService,$location) {

        var vm=this;
        vm.createWebsite=createWebsite;

        var userId=$routeParams['uid'];

        function init() {
            WebsiteService.findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites=websites;
                });
        }
        init();

        var websiteId=$routeParams['wid'];
        vm.userId=userId;



        function createWebsite(userId,newwebsite) {
            WebsiteService.createWebsite(userId,newwebsite)
                .success(function (websites) {
                    if(websites)
                    {
                        $location.url("/user/"+userId+"/website");
                    }
                    else
                    {}

                });



        }


    }

    function EditWebsiteController($routeParams,$location,WebsiteService) {

        var vm=this;
        vm.delete=websitedelete;
        vm.updateWebsite=updateWebsite;

        var userId=$routeParams['uid'];
        var websiteId=$routeParams['wid'];

        function init() {
            WebsiteService.findWebsiteById(websiteId)
                .success(function (website) {
                    vm.website = website;
                });

            WebsiteService.findWebsitesByUser(userId)
                        .success(function (websites) {
                            vm.websites=websites;
                });


        }
        init();




        function websitedelete() {
            WebsiteService.deleteWebsite(websiteId)
                .success(function (deleted) {
                    if(deleted)
                    {
                        $location.url("/user/"+userId+"/website");
                    }
                    else
                    {}

                });
        }

        function updateWebsite(website)
        {
            WebsiteService.updateWebsite(websiteId,website)
                .success(function (updatedwebsite) {
                    if(updatedwebsite)
                    {
                        $location.url("/user/"+userId+"/website");
                    }
                    else
                    {}

                });

        }


    }
})();