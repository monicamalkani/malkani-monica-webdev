/**
 * Created by monica on 3/20/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var widgetSchema = mongoose.Schema({

        _page:{type:mongoose.Schema.Types.ObjectId, ref:"pageModel"},
        type:{type:String,enum:['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name:String,
        text:String,
        placeholder:String,
        description:String,
        url:String,
        width:String,
        height:String,
        rows:Number,
        size:Number,
        position:Number,
        class:String,
        icon:String,
        deletable:Boolean,
        formatted:Boolean,
        dateCreated:Date


    }, {collection: 'widget.collection'});


    widgetSchema.post('remove',function () {
        var widget=this;

        var pageModel = require('../page/page.model.server');

        pageModel.findPageById(widget._page)
            .then(function (page) {
                var index = page.widgets.indexOf(widget._id);
                if (index > -1) {
                    page.widgets.splice(index, 1);
                    page.save();
                }
            });




    });

    return widgetSchema;
};