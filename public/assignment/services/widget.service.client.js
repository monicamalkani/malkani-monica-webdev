(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

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
            "deleteWidget":deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            var id=widgets[widgets.length - 1]._id;

            if((widget.widgetType==='HEADING')|| (widget.widgetType==="HTML"))
            { widgets.push({_id:(String(Number(id)+1)), widgetType:widget.widgetType , pageId:widget.pageId , size:widget.size, text:widget.text });}

            if((widget.widgetType==='IMAGE')|| (widget.widgetType==="YOUTUBE"))
            {widgets.push({_id:(String(Number(id)+1)), widgetType:widget.widgetType , pageId:widget.pageId ,width:widget.width, url:widget.url});}


            return widgets[widgets.length - 1];


        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets)
            {
                if(widgets[w]._id===widgetId && (widgets[w].widgetType==="HEADING" || widgets[w].widgetType==="HTML"))
                {
                    widgets[w].size=widget.size;
                    widgets[w].text=widget.text;
                    return widgets[w];

                }
                if(widgets[w]._id===widgetId && (widgets[w].widgetType==="IMAGE"||widgets[w].widgetType==="YOUTUBE"))
                {
                    widgets[w].width=widget.width;
                    widgets[w].url=widget.url;
                    return widgets[w];

                }

            }
            return null;

        }
        function deleteWidget(widgetId) {
            for(var w in widgets)
            {
                if(widgets[w]._id==widgetId)
                {
                    widgets.splice(widgets.indexOf(widgets[w]),1);
                    return true;
                }

            }
            return null;
        }
        function findWidgetsByPageId(pageId) {
                 var widgetsinpage=[];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    widgetsinpage.push(widgets[w]);
                }
            }
            return widgetsinpage;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }
    }
})();