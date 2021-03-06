    module.exports=function(app) {

        var websiteModel=require("../model/website/website.model.server");

        app.get('/api/user/:userId/website',findWebsitesByUser);
        app.post('/api/user/:userId/website',createWebsite);
        app.get('/api/website/:websiteId',findWebsiteById);
        app.put('/api/website/:websiteId',updateWebsite);
        app.delete('/api/website/:websiteId',deleteWebsite);



        // var websites = [
        //     {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        //     {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        //     {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        //     {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        //     {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        //     {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        // ];

    function findWebsitesByUser(req,res) {
        var userId=req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function(websites) {
                res.json(websites);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


        //
        // var sites=[];
        // for(var w in websites)
        // {if(userId===websites[w].developerId)
        // {sites.push(websites[w])}
        //
        // }
        // res.json(sites);


    }

    function createWebsite(req,res) {

        var website=req.body;
        var userId=req.params.userId;
        websiteModel
            .createWebsiteForUser(userId,website)
            .then(function(website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var userId=req.params.userId;
        //
        // var id=websites[websites.length - 1]._id;
        // websites.push({_id:(String(Number(id)+1)), name:website.name , developerId:userId , description:website.description});
        // res.json(websites[websites.length - 1]);

    }

    function findWebsiteById(req,res) {
        var websiteId=req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(function(website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });



        //
        // for(var w in websites)
        // {if(websiteId===websites[w]._id)
        // {res.json(websites[w]) ;}
        // }

    }

    function updateWebsite(req,res) {

        var website=req.body;
        var websiteId=req.params.websiteId;
        websiteModel
            .updateWebsite(websiteId,website)
            .then(function(website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
        //
        // for(var w in websites)
        // {
        //     if(websites[w]._id==websiteId)
        //     {  websites[w].name=website.name;
        //         websites[w].description=website.description;
        //         res.json(websites[w]);}
        //
        // }

    }

    function deleteWebsite(req,res) {

        var websiteId=req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function(website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
        // for(var w in websites)
        // {
        //     if(websites[w]._id==websiteId)
        //     {
        //         websites.splice(websites.indexOf(websites[w]),1);
        //         res.json(true);
        //     }
        //
        // }

    }
}


