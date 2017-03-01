(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api={
            "createWidget":createWidget,
            "findWidgetsByPageId":findWidgetsByPageId,
            "findWidgetById":findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget,
            "reorderlist":reorderlist
        };
        return api;

        function reorderlist(pageId,index1,index2) {
           return $http.put("/api/page/"+pageId+"/widget?initial="+index1+"&final="+index2);
        }
        function createWidget(pageId, widget) {
            return $http.post("/api/page/"+pageId+"/widget",widget);

        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId,widget);

        }
        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);

        }
        function findWidgetsByPageId(pageId) {

            return $http.get("/api/page/"+pageId+"/widget");

        }

        function findWidgetById(widgetId) {
          return angular.copy($http.get("/api/widget/"+widgetId));
        }
    }
})();