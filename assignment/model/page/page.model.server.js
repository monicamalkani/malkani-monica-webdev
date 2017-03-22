
    var q = require('q');
    var mongoose = require('mongoose');

    var pageSchema = require("./page.schema.server")();

    var pageModel = mongoose.model("pageModel", pageSchema);
    var websiteModel =require("../website/website.model.server");

    pageModel.createPage=createPage;
    pageModel.findAllPagesForWebsite=findAllPagesForWebsite;
    pageModel.findPageById=findPageById;
    pageModel.updatePage=updatePage;
    pageModel.deletePage=deletePage;

    module.exports=pageModel;

    function createPage(websiteId, page) {
        var deffered =q.defer();
        pageModel
            .create({_website:websiteId ,name:page.name,description:page.description},function (err,page) {
                if(err){
                    deffered.abort(err);
                }
                else
                {
                    websiteModel
                        .findById(websiteId , function (err, user) {
                            user.pages.push(page._id);
                            user.save();
                        });
                    deffered.resolve(page);
                }

            });
        return deffered.promise;

    }

    function findAllPagesForWebsite(websiteId) {
        var deffered =q.defer();
        pageModel
            .find({_website: websiteId },function (err,pages) {
                if(err){
                    deffered.abort(err);
                }
                else
                {
                    deffered.resolve(pages);

                }

            });
        return deffered.promise;

    }

    function findPageById(pageId) {
        var deffered=q.defer();
        pageModel
            .findById(pageId,function (err,page) {
                deffered.resolve(page);

            });
        return deffered.promise;

    }

    function updatePage(pageId, page) {

        var deffered =q.defer();
        pageModel
            .update(
                {_id: pageId },
                {$set: {name:page.name,description:page.description}},function (err,page) {
                    if(err){
                        deffered.abort(err);
                    }
                    else{
                        deffered.resolve(page);
                    }


            });

        return deffered.promise;

    }

    function deletePage(pageId) {
        var deffered =q.defer();
        pageModel
            .findByIdAndRemove(pageId,function (err, page) {
                if(err)
                    deffered.reject(err);
                else {
                    page.remove();
                    deffered.resolve(page);
                }
            });

        return deffered.promise;

    }
/**
 * Created by monica on 3/20/17.
 */
