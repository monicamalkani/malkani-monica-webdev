(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {



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