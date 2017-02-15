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

        var pages=PageService.findPageByWebsiteId(websiteId);
        vm.pages=pages;
        vm.userId=userId;
        vm.websiteId=websiteId;


    }
    function NewPageController($routeParams,PageService,$location) {
        var userId=$routeParams['uid'];
        var websiteId=$routeParams['wid'];
        var pages=PageService.findPageByWebsiteId(websiteId);
        var vm=this;
        vm.pages=pages;
        vm.userId=userId;
        vm.websiteId=websiteId;



        vm.createPage=createPage;

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
        var userId=$routeParams['uid'];
        var websiteId=$routeParams['wid'];
        var pageId=$routeParams['pid'];
        vm.websiteId=websiteId;
        var pages=PageService.findPageByWebsiteId(websiteId);
        vm.pages=pages;
        vm.userId=userId;
        vm.pageId=pageId;
        vm.page=PageService.findPageById(pageId);


        vm.delete=deletePage;
        vm.updatePage=updatePage;

        function deletePage(pageId) {
            var deleted=PageService.deletePage(pageId);
            if(deleted)
            {
                $location.url("/user/"+userId+"/website/"+websiteId+"/page");
            }
            else
            {}

        }


        function updatePage(pageId,page)
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