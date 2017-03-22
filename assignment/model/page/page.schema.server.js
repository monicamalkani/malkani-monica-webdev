/**
 * Created by monica on 3/20/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var pageSchema = mongoose.Schema({

        _website:{type:mongoose.Schema.Types.ObjectId, ref:"websiteModel"},
        name:String,
        description:String,
        title:String,
        widgets:[{type:mongoose.Schema.Types.ObjectId, ref:"widgetModel"}],
        dateCreated:Date


    }, {collection: 'page.collection'});

    pageSchema.post('remove',function () {
        var page=this;
        var widgetModel = require('../widget/widget.model.server');
        var websiteModel = require('../website/website.model.server');

        websiteModel.findWebsiteById(page._website)
            .then(function (website) {
                var index = website.pages.indexOf(page._id);
                if (index > -1) {
                    website.pages.splice(index, 1);
                    website.save();
                }
            });

        widgetModel.remove({_id: {$in: page.widgets}}).exec();


    });


    return pageSchema;
};