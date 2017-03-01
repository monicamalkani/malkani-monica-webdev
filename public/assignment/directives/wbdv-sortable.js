(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);



    function sortableDir($routeParams,WidgetService) {
        var pageId=$routeParams.pid;
        function linkFunc(scope, element, attributes) {

            var index1=-1;
            var index2=-1;

            element.sortable({axis: 'y',
                start:function (event,ui) {
                    index1=ui.item.index();

                },
                stop:function (event,ui) {
                    index2=ui.item.index();

                    WidgetService.reorderlist(pageId,index1,index2)
                        .success(function (successful) {
                            if(successful)
                            {;}


                        })

                }


            });




        }
        return {
            link: linkFunc
        };
    }
})();