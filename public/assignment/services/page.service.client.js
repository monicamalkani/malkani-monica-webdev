(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",pageService);

    function pageService($http) {
        var pages=[
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api={
            "createPage":createPage,
            "findPageByWebsiteId":findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };
        return api;

        function createPage(websiteId, page) {
          return $http.post("/api/website/"+websiteId+"/page",page);

        }

        function findPageByWebsiteId(websiteId) {

            return $http.get("/api/website/"+websiteId+"/page");

            // var sites=[];
            // for(var p in pages)
            // {if(websiteId===pages[p].websiteId)
            // {sites.push(pages[p])}
            //
            // }
            // return sites;

        }

        function findPageById(pageId) {
            return angular.copy($http.get("/api/page/"+pageId));
            // for(var p in pages)
            // {if(pageId===pages[p]._id)
            // {return angular.copy(pages[p]);}
            // }
            // return null;
        }



        function updatePage(pageId, page) {
            return $http.put("/api/page/"+pageId,page);
            // for(var p in pages)
            // {
            //     if(pages[p]._id==pageId)
            //     {  pages[p].name=page.name;
            //         pages[p].description=page.description;
            //         return pages[p];}
            //
            // }
            // return null;
        }

        function deletePage(pageId) {
            return $http.delete('/api/page/'+pageId);
            // for(var p in pages)
            // {
            //     if(pages[p]._id==pageId)
            //     {
            //         pages.splice(pages.indexOf(pages[p]),1);
            //         return true;
            //     }
            //
            // }
            // return null;


        }



    };
})();