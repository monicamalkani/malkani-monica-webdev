//to provide data

(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", websiteService);

    function websiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        this.findAllWebsites=findAllWebsites;

        this.findWebsiteById=findWebsiteById;
        function findAllWebsites(userId) {
            var sites=[];
            for(var w in websites)
            {if(userId===websites[w].developerId)
            {sites.push(websites[w])}

            }
            return sites;
        }
        function findWebsiteById(websiteId) {

            for(var w in websites)
            {if(websiteId===websites[w]._id)
            {return angular.copy(websites[w]);}

            }
            return null;
        }

    }
})();