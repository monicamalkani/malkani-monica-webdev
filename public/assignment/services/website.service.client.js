(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",websiteService);

    function websiteService($http) {
        var websites=[
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];
        var api={
            "createWebsite":createWebsite,
            "findWebsitesByUser":findWebsitesByUser,
            "findWebsiteById":findWebsiteById,
            "updateWebsite":updateWebsite,
            "deleteWebsite":deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website",website);
            // var id=websites[websites.length - 1]._id;
            // websites.push({_id:(String(Number(id)+1)), name:website.name , developerId:userId , description:website.description});
            // return websites[websites.length - 1];

        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
            // var sites=[];
            // for(var w in websites)
            // {if(userId===websites[w].developerId)
            // {sites.push(websites[w])}
            //
            // }
            // return sites;

        }

        function findWebsiteById(websiteId) {
            return angular.copy($http.get("/api/website/"+websiteId));
            // for(var w in websites)
            // {if(websiteId===websites[w]._id)
            // {return angular.copy(websites[w]);}
            // }
            // return null;
        }



            function updateWebsite(websiteId, website) {
            return $http.put("/api/website/"+websiteId,website);
            // for(var w in websites)
            // {
            //     if(websites[w]._id==websiteId)
            //     {  websites[w].name=website.name;
            //         websites[w].description=website.description;
            //         return websites[w];}
            //
            // }
            // return null;
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
            // for(var w in websites)
            // {
            //     if(websites[w]._id==websiteId)
            //     {
            //         websites.splice(websites.indexOf(websites[w]),1);
            //         return true;
            //     }
            //
            // }
            // return null;


        }



    };
})();