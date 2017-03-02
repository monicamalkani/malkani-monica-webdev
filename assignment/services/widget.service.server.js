module.exports=function(app){
    app.put('/api/page/:pageId/widget?',reorder);
    app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
    app.get('/api/widget/:widgetId',findWidgetById);
    app.put('/api/widget/:widgetId',updateWidget);
    app.post('/api/page/:pageId/widget',createWidget);
    app.delete('/api/widget/:widgetId',deleteWidget);

    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+"/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now()+ '.' +extension)
        }
    });
    var upload = multer({storage: storage});
    app.post ("/api/upload", upload.single('myFile'), uploadImage);





    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function reorder(req,res) {
        var index1=parseInt(req.query['initial']);
        var index2=parseInt(req.query['final']);
        var pid = req.params.pageId;

        var index1 = parseInt(req.query.initial);
        var index2 = parseInt(req.query.final);

        var widgetforpage = [];
        for (var index in widgets) {
            if (widgets[index].pageId === pid) {
                widgetforpage.push(index);
            }
        }

        for (var i = index1; i < index2; i++) {
            var temp = widgets[widgetforpage[i]];
            widgets[widgetforpage[i]] = widgets[widgetforpage[i+1]];
            widgets[widgetforpage[i+1]] = temp;
        }

        for (var i = index1; i > index2; i--) {
            var temp = widgets[widgetforpage[i]];
            widgets[widgetforpage[i]] = widgets[widgetforpage[i-1]];
            widgets[widgetforpage[i-1]] = temp;
        }

        res.sendStatus(200);


    }
    function findAllWidgetsForPage(req,res) {
        var pageId=req.params.pageId;
        var widgetsinpage=[];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId) {
                widgetsinpage.push(widgets[w]);
            }
        }
       res.json(widgetsinpage);

    }

    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
               res.json(widgets[w]);
            }
        }

    }

    function updateWidget(req,res) {
        var widgetId=req.params.widgetId;
        var widget=req.body;
        for(var w in widgets)
        {
            if(widgets[w]._id===widgetId && (widgets[w].widgetType==="HEADING" || widgets[w].widgetType==="HTML"))
            {
                widgets[w].size=widget.size;
                widgets[w].text=widget.text;
               res.json(widgets[w]);

            }
            if(widgets[w]._id===widgetId && (widgets[w].widgetType==="IMAGE"||widgets[w].widgetType==="YOUTUBE"))
            {
                widgets[w].width=widget.width;
                widgets[w].url=widget.url;
                 res.json(widgets[w]);

            }

        }

    }

    function createWidget(req,res) {
        var pageId=req.params.pageId;
        var widget=req.body;
        var id=widgets[widgets.length - 1]._id;

        if((widget.widgetType==='HEADING')|| (widget.widgetType==="HTML"))
        { widgets.push({_id:(String(Number(id)+1)), widgetType:widget.widgetType , pageId:widget.pageId , size:widget.size, text:widget.text });}

        if((widget.widgetType==='IMAGE')|| (widget.widgetType==="YOUTUBE"))
        {widgets.push({_id:(String(Number(id)+1)), widgetType:widget.widgetType , pageId:widget.pageId ,width:widget.width, url:widget.url});}


        res.json(widgets[widgets.length - 1]);


    }

    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        for(var w in widgets)
        {
            if(widgets[w]._id==widgetId)
            {
                widgets.splice(widgets.indexOf(widgets[w]),1);
                res.json(true);
            }

        }
    }





    function uploadImage(req, res) {

        var pageId        = req.body.pageId;
       // console.log(pageId);
        var widgetId      = req.body.widgetId;
        var width         = "100%";
        //console.log("wif"+width);
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;
        if(myFile)
        {
        var destination   = myFile.destination; // folder where file is saved to

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
                pageId = widgets[i].pageId;
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+ widgetId);}
    }


};