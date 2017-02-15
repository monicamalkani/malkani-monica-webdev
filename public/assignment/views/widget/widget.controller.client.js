(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("EditWidgetController", EditWidgetController)
        .controller("NewWidgetController", NewWidgetController);


    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();


        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }


    function EditWidgetController($routeParams,$location,WidgetService) {
        var vm=this;
        vm.delete=deleteWidget;
        vm.updateWidget=updateWidget;

        var userId=$routeParams['uid'];
        var websiteId=$routeParams['wid'];
        var pageId=$routeParams['pid'];
        var widgetId=$routeParams['wgid']

        vm.userId=userId;
        vm.websiteId=websiteId;
        vm.pageId=pageId;
        vm.widgetId=widgetId;
        function init() {

            vm.widget=WidgetService.findWidgetById(widgetId);
        }
        init();


        function deleteWidget() {

            var deletewg=WidgetService.deleteWidget(widgetId);
            if(deletewg)
                $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
            else
            {}

        }
        function updateWidget(widget) {
            var updatedwidget=WidgetService.updateWidget(widgetId,widget);
            if(updatedwidget)
                $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
            else
            {}

        }



    }

    function NewWidgetController($routeParams,$location,WidgetService) {
        var vm=this;
        vm.createWidget=createWidget;

        var userId=$routeParams['uid'];
        var websiteId=$routeParams['wid'];
        var pageId=$routeParams['pid'];


        vm.userId=userId;
        vm.websiteId=websiteId;
        vm.pageId=pageId;

        
        function createWidget(type) {
            if(type==='html')
            {var widget={widgetType:"HTML", pageId:pageId , size:3, text:"LOREN IPSUM" };
             var newwidget=WidgetService.createWidget(pageId, widget);
                if(newwidget)
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newwidget._id);
                else
                {}

            }
            else  if(type==='image')
            {var widget={widgetType:"IMAGE", pageId:pageId , width:"100%" , url:"http://lorempixel.com/400/200/" };
                var newwidget=WidgetService.createWidget(pageId, widget);
                if(newwidget)
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newwidget._id);
                else
                {}

            }
            if(type==='heading')
            {var widget={widgetType:"HEADING", pageId:pageId , size:3, text:"LOREN IPSUM" };
                var newwidget=WidgetService.createWidget(pageId, widget);
                if(newwidget)
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newwidget._id);
                else
                {}

            }
            if(type==='youtube')
            {var widget={widgetType:"YOUTUBE", pageId:pageId , width:"100%" , url:"https://youtu.be/AM2Ivdi9c4E"  };
                var newwidget=WidgetService.createWidget(pageId, widget);
                if(newwidget)
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newwidget._id);
                else
                {}

            }
            else

            return null;
            
        }

    }

})();