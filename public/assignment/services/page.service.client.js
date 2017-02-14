(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",pageService);

    function pageService() {
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
            var id=pages[pages.length - 1]._id;
            pages.push({_id:(String(Number(id)+1)), name:page.name , websiteId:websiteId , description:page.description});
            return pages[pages.length - 1];

        }

        function findPageByWebsiteId(websiteId) {
            var sites=[];
            for(var p in pages)
            {if(websiteId===pages[p].websiteId)
            {sites.push(pages[p])}

            }
            return sites;

        }

        function findPageById(pageId) {
            for(var p in pages)
            {if(pageId===pages[p]._id)
            {return angular.copy(pages[p]);}
            }
            return null;
        }



        function updatePage(pageId, page) {
            for(var p in pages)
            {
                if(pages[p]._id==pageId)
                {  pages[p].name=page.name;
                    pages[p].description=page.description;
                    return pages[p];}

            }
            return null;
        }

        function deletePage(pageId) {
            for(var p in pages)
            {
                if(pages[p]._id==pageId)
                {
                    pages.splice(pages.indexOf(pages[p]),1);
                    return true;
                }

            }
            return null;


        }



    };
})();