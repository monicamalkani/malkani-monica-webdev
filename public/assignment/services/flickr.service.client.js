(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    function FlickrService($http) {

        var api = {
            "searchPhotos": searchPhotos

        };
        return api;






        function searchPhotos(searchTerm) {
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var key = "879ac3e6b832848731ce7a47ce244250";
            var secret = "4ace65a8dd01c51c";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }


    }
})();