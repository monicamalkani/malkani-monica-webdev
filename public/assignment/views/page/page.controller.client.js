(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)
        .controller("NewPageController",NewPageController)
        .controller("EditPageController",EditPageController);

    function PageListController($routeParams,PageService) {
        var vm=this;
        var websiteId=$routeParams['wid'];
        var userId=$routeParams['uid'];

        function init() {
            var pages=PageService.findPageByWebsiteId(websiteId);
            vm.pages=pages;
        }
        init();



        vm.userId=userId;
        vm.websiteId=websiteId;


    }
    function NewPageController($routeParams,PageService,$location) {
        var vm=this;
        vm.createPage=createPage;

        var userId=$routeParams['uid'];
        var websiteId=$routeParams['wid'];

        function init() {
            var pages=PageService.findPageByWebsiteId(websiteId);
            vm.pages=pages;
        }
        init();

        vm.userId=userId;
        vm.websiteId=websiteId;



        function createPage(websiteId,newpage) {
            pages=PageService.createPage(websiteId,newpage);
            if(pages)
            {
                $location.url("/user/"+userId+"/website"+websiteId+"/page");
            }
            else
            {}


        }


    }

    function EditPageController($routeParams,$location,PageService) {
        var vm=this;
        vm.delete=deletePage;
        vm.updatePage=updatePage;


        var userId=$routeParams['uid'];
        var websiteId=$routeParams['wid'];
        var pageId=$routeParams['pid'];

        function init() {
            vm.page=PageService.findPageById(pageId);
        }
        init();

        var pages=PageService.findPageByWebsiteId(websiteId);
        vm.pages=pages;
        vm.websiteId=websiteId;

        vm.userId=userId;
        vm.pageId=pageId;




        function deletePage() {
            var deleted=PageService.deletePage(pageId);
            if(deleted)
            {
                $location.url("/user/"+userId+"/website/"+websiteId+"/page");
            }
            else
            {}

        }


        function updatePage(page)
        {
            var updatedpage=PageService.updatePage(pageId,page);
            if(updatedpage)
            {
                $location.url("/user/"+userId+"/website/"+websiteId+"/page");
            }
            else
            {}
        }


    }




})();