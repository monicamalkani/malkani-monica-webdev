module.exports=function(app){
    app.post('/api/website/:websiteId/page',createPage);
    app.get('/api/website/:websiteId/page',findAllPagesForWebsite);
    app.get('/api/page/:pageId',findPageById);
    app.put('/api/page/:pageId',updatePage);
    app.delete('/api/page/:pageId',deletePage);


    var pages=[
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req,res) {
        var websiteId=req.params.websiteId;
        var id=pages[pages.length - 1]._id;
        var page=req.body;
        pages.push({_id:(String(Number(id)+1)), name:page.name , websiteId:websiteId , description:page.description});
        res.json(pages[pages.length - 1]);

    }

    function findAllPagesForWebsite(req,res) {
        var sites=[];
        var websiteId=req.params.websiteId;
        for(var p in pages)
        {if(websiteId===pages[p].websiteId)
        {sites.push(pages[p])}

        }
        res.json(sites);

    }
    function findPageById(req,res) {
        var pageId=req.params.pageId;
        for(var p in pages)
        {if(pageId===pages[p]._id)
        {res.json(pages[p]);}
        }

    }
    function updatePage(req,res) {
        var pageId=req.params.pageId;
        var page=req.body;
        for(var p in pages)
        {
            if(pages[p]._id==pageId)
            {  pages[p].name=page.name;
                pages[p].description=page.description;
                res.json(pages[p]);}

        }
    }

    function deletePage(req,res) {
        var pageId=req.params.pageId;
        for(var p in pages)
        {
            if(pages[p]._id==pageId)
            {
                pages.splice(pages.indexOf(pages[p]),1);
                res.json(true);
            }

        }
       }






}