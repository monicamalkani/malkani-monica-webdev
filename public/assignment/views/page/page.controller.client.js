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
           PageService.findPageByWebsiteId(websiteId)
           .success(function (pages) {
               vm.pages=pages;
            })

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
            PageService.findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pages=pages;
            })
        }
        init();

        vm.userId=userId;
        vm.websiteId=websiteId;



        function createPage(websiteId,newpage) {
            PageService.createPage(websiteId,newpage)
                .success(function (pages) {
                    if(pages)
                    {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                    }
                    else
                    {}

                });
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
           PageService.findPageById(pageId)
               .success(function (page) {
                   vm.page=page;
               });
           PageService.findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pages=pages;
        });
        }

        init();

        vm.websiteId=websiteId;

        vm.userId=userId;
        vm.pageId=pageId;


        function deletePage() {
          PageService.deletePage(pageId)
              .success(function (deleted) {
                  if(deleted)
                  {
                      $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                  }
                  else
                  {}
              })
        }


        function updatePage(page)
        {
            PageService.updatePage(pageId,page)
                .success(function (updatedpage) {
                    if(updatedpage)
                    {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                    }
                    else
                    {}
                })

        }



}
})();