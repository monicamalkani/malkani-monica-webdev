
    var q = require('q');
    var mongoose = require('mongoose');

    var websiteSchema = require("./website.schema.server")();
    var userModel = require("../user/user.model.server");
    var websiteModel = mongoose.model("websiteModel", websiteSchema);


    websiteModel.createWebsiteForUser= createWebsiteForUser;
    websiteModel.findAllWebsitesForUser=findAllWebsitesForUser;
    websiteModel.findWebsiteById=findWebsiteById;
    websiteModel.updateWebsite=updateWebsite;
    websiteModel.deleteWebsite=deleteWebsite;

     module.exports=websiteModel;


    function createWebsiteForUser(userId, website) {
        var deffered =q.defer();
        websiteModel
            .create({_user:userId ,name:website.name,description:website.description},function (err,website) {
                if(err){
                    deffered.abort(err);
                }
                else
                {
                   userModel
                       .findById(userId, function (err, user) {
                           user.websites.push(website._id);
                           user.save();
                           });
                   deffered.resolve(website);
                }

            });
        return deffered.promise;

    }

    function findAllWebsitesForUser(userId) {
        var deffered =q.defer();
        websiteModel
            .find({_user: userId },function (err,website) {
                if(err){
                    deffered.abort(err);
                }
                else
                {
                    deffered.resolve(website);

                }

            });
        return deffered.promise;

    }

    function findWebsiteById(websiteId) {
        var deffered=q.defer();
        websiteModel
            .findById(websiteId,function (err,website) {
                deffered.resolve(website);

            });
        return deffered.promise;

    }

    function updateWebsite(websiteId, website) {

        var deffered =q.defer();
        websiteModel
            .update(
                {_id: websiteId },
                {$set: {name:website.name,description:website.description}},function (err,website) {
                    if(err){
                        deffered.abort(err);
                    }
                    else
                    {
                        deffered.resolve(website);

                    }

            });

        return deffered.promise;

    }

    function deleteWebsite(websiteId) {
    var deffered =q.defer();
         websiteModel
            .findByIdAndRemove(websiteId,function (err, website) {
                if(err)
                    deffered.reject(err);
                else {
                    website.remove();
                    deffered.resolve(website);
                }
            });

        return deffered.promise;

    }