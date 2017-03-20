/**
 * Created by monica on 3/19/17.
 */
(function () {
        angular
            .module("WebAppMaker")
            .controller("FlickrImageSearchController", FlickrImageSearchController)
        
    
    function FlickrImageSearchController($routeParams,$location,FlickrService,WidgetService) {

        var vm = this;
        var newWidget;
        var widgetId=$routeParams['wgid'];
        var websiteId=$routeParams['wid'];
        var pageId=$routeParams['pid'];
        var userId=$routeParams['uid'];

        function init() {

            WidgetService
                .findWidgetById(widgetId)
                .then(function (neww) {
                    newWidget=neww;
                    console.log("mofjoie");


                })

            console.log(newWidget);
        }
        init();


        vm.searchPhotos = function(searchTerm) {

            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        vm.selectPhoto=selectPhoto;


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            newWidget.url=url;

            WidgetService
                .updateWidget( widgetId,newWidget)
                .then(function (updatedwidget) {
                    var updatedwidget=updatedwidget;
                    if(updatedwidget)
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    else
                    {}

                });
        }



    }
})();