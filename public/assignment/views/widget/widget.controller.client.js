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
           WidgetService.findWidgetsByPageId(vm.pageId)
               .success(function (widgets) {
                   vm.widgets = widgets;

               })

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

            WidgetService.findWidgetById(widgetId)
                .success(function (widget) {
                    vm.widget=widget;

                });
        }
        init();


        function deleteWidget() {

            WidgetService.deleteWidget(widgetId)
                .success(function (deletewg) {
                    var deletewg=deletewg;
                    if(deletewg)
                    {console.log("errooor");
                    console.log(deletewg);
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");}
                    else
                    {}

                });


        }
        function updateWidget(widget) {
            WidgetService.updateWidget(widgetId,widget)
                .success(function (updatedwidget) {
                    var updatedwidget=updatedwidget;
                    if(updatedwidget)
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    else
                    {}

                });


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
             WidgetService.createWidget(pageId, widget)
                 .success(function (newwidget) {
                     var newwidget=newwidget;
                     if(newwidget)
                         $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newwidget._id);
                     else
                     {console.log("error");}

                 });

            }
            else  if(type==='image')
            {var widget={widgetType:"IMAGE", pageId:pageId , width:"100%" , url:"http://lorempixel.com/400/200/" };
                WidgetService.createWidget(pageId, widget)
                    .success(function (newwidget) {
                        var newwidget=newwidget;
                        if(newwidget)
                            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newwidget._id);
                        else
                        {}
                    });


            }
            if(type==='heading')
            {var widget={widgetType:"HEADING", pageId:pageId , size:3, text:"LOREN IPSUM" };
                WidgetService.createWidget(pageId, widget)
                    .success(function (newwidget) {
                        var newwidget=newwidget;
                        if(newwidget)
                            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newwidget._id);
                        else
                        {}

                    });


            }
            if(type==='youtube')
            {var widget={widgetType:"YOUTUBE", pageId:pageId , width:"100%" , url:"https://youtu.be/AM2Ivdi9c4E"  };
                WidgetService.createWidget(pageId, widget)
                    .success(function (newwidget) {
                        var newwidget=newwidget;
                        if(newwidget)
                            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newwidget._id);
                        else
                        {}

                    });


            }
            if(type==='text')
            {var widget={widgetType:"TEXT", pageId:pageId ,rows:2 ,text:"LOREN IPSUM" ,formatted:true,placeholder:"text"};
                WidgetService.createWidget(pageId, widget)
                    .success(function (newwidget) {
                        var newwidget=newwidget;
                        if(newwidget)
                            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newwidget._id);
                        else
                        {}

                    });


            }
            else

            return null;
            
        }

    }

})();