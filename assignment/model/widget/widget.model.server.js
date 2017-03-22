
var q = require('q');
var mongoose = require('mongoose');

var widgetSchema = require("./widget.schema.server")();
var pageModel = require("../page/page.model.server");
var widgetModel = mongoose.model("widgetModel", widgetSchema);


widgetModel.createWidget= createWidget;
widgetModel.findAllWidgetsForPage=findAllWidgetsForPage;
widgetModel.findWidgetById=findWidgetById;
widgetModel.updateWidget=updateWidget;
widgetModel.deleteWidget=deleteWidget;
widgetModel.reorderWidget=reorderWidget;

module.exports=widgetModel;


function createWidget(pageId, widget) {

    var deffered =q.defer();
    widget._page=pageId;
    widget.type=widget.widgetType;
    widgetModel
        .findOne({_page:pageId }).sort({position:-1}).exec(function (err,lwidget) {
        if(lwidget==null){

            widget.position=0;
        }
        else
        {
            widget.position=lwidget.position+1;

        }
        widgetModel
            .create(widget,function (err,widgetnew) {
                if(err){
                    //console.log(err);
                    deffered.reject(err);
                }
                else
                {
                    pageModel
                        .findById(pageId, function (err, page) {
                            page.widgets.push(widgetnew._id);
                            page.save(function (err,success) {
                                if(err)
                                    deffered.reject();
                                else

                                {  // console.log("pppp"+widgetnew)
                                    deffered.resolve(widgetnew);}
                            });
                        });


                }

            });
    });


    return deffered.promise;


}

function findAllWidgetsForPage(pageId) {
    var deffered =q.defer();
    widgetModel
        .find({_page:pageId }).sort({position:1}).exec(function (err,widget) {
            if(err){
                deffered.reject(err);
            }
            else
            {   deffered.resolve(widget);
            }

        });
    return deffered.promise;

}

function findWidgetById(widgetId) {
    var deffered=q.defer();
    widgetModel
        .findById(widgetId,function (err,widget) {
            if(widget){
                deffered.resolve(widget);}
            else
            {
            deffered.reject();}


        });
    return deffered.promise;

}

function updateWidget(widgetId, widget) {

    var deffered =q.defer();
    widgetModel
        .update(
            {_id: widgetId},
            {$set: widget},function (err,widget) {
                if(err){

                    deffered.reject(err);
                }
                else
                {
                    deffered.resolve(widget);

                }

            });

    return deffered.promise;

}

function deleteWidget(widgetId) {

    var deffered =q.defer();
    widgetModel
        .findById(widgetId,function (err,widget) {
            if(err)
                deferred.reject(err);
            else {
                widgetModel
                    .update({
                            _page: widget._page,
                            position: {$gt: widget.position}
                        }, {$inc: {position: -1}}, {multi: true},
                        function (err, success) {
                            if (err)
                                deffered.reject(err);
                            else {
                                widgetModel
                                    .findByIdAndRemove(widgetId, function (err, widget) {
                                        if (err)
                                            deffered.reject(err);
                                        else {
                                            widget.remove();
                                            deffered.resolve(widget);
                                        }
                                    });
                            }
                        });
            }
      });

    return deffered.promise;

}

function reorderWidget(pageId, start, end) {
    var deffered =q.defer();
    if(start<end)
    {
        widgetModel
            .update({_page: pageId ,position: {$gt: start,$lte :end}},{$inc:{position:-1}},{multi: true},
            function (err,success) {
                if (err)
                    deffered.reject(err);
                else {
                    widgetModel
                        .findOneAndUpdate({
                            _page: pageId,
                            position: start
                        }, {$set: {position: end}}, function (err, success) {
                            if (err)
                                deffered.reject(err);
                            else
                                deffered.resolve(success);
                        });

                }
            });
    }
    else
    {
        widgetModel
            .update({_page: pageId ,position: {$gte: end,$lt :start}},{$inc:{position:1}},{multi: true},
                function (err,success) {
                    if (err)
                        deffered.reject(err);
                    else {
                        widgetModel
                            .findOneAndUpdate({
                                _page: pageId,
                                position: start
                            }, {$set: {position: end}}, function (err, success) {
                                if (err)
                                    deffered.reject(err);
                                else
                                    deffered.resolve(success);
                            });

                    }
                });

    }
    return deffered.promise;


}