module.exports=function(app) {
    app.put('/api/page/:pageId/widget?', reorder);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.post('/api/page/:pageId/widget', createWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var widgetModel = require("../model/widget/widget.model.server");


    function reorder(req, res) {

        var index1 = parseInt(req.query['initial']);
        var index2 = parseInt(req.query['final']);
        var pid = req.params.pageId;
        widgetModel
            .reorderWidget(pid, index1, index2)
            .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var index1=parseInt(req.query['initial']);
        // var index2=parseInt(req.query['final']);
        // var pid = req.params.pageId;
        //
        // var index1 = parseInt(req.query.initial);
        // var index2 = parseInt(req.query.final);
        //
        // var widgetforpage = [];
        // for (var index in widgets) {
        //     if (widgets[index].pageId === pid) {
        //         widgetforpage.push(index);
        //     }
        // }
        //
        // for (var i = index1; i < index2; i++) {
        //     var temp = widgets[widgetforpage[i]];
        //     widgets[widgetforpage[i]] = widgets[widgetforpage[i+1]];
        //     widgets[widgetforpage[i+1]] = temp;
        // }
        //
        // for (var i = index1; i > index2; i--) {
        //     var temp = widgets[widgetforpage[i]];
        //     widgets[widgetforpage[i]] = widgets[widgetforpage[i-1]];
        //     widgets[widgetforpage[i-1]] = temp;
        // }
        //
        // res.sendStatus(200);


    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {

                res.json(widgets);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


        //  var widgetsinpage=[];
        //  for(var w in widgets) {
        //      if(widgets[w].pageId === pageId) {
        //          widgetsinpage.push(widgets[w]);
        //      }
        //  }
        // res.json(widgetsinpage);

    }

    function findWidgetById(req, res) {

        var widgetId = req.params.widgetId;


        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {

                res.json(widget);
            }, function (error) {console.log(widget);
                res.sendStatus(500).send(error);
            });


        // for(var w in widgets) {
        //     if(widgets[w]._id === widgetId) {
        //        res.json(widgets[w]);
        //     }
        // }

    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;


        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (widget) {

                res.json(widget);
            }, function (error) {

                res.sendStatus(500).send(error);
            });


    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                console.log(widget);
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(function (widget) {
                console.log("inside delete" + widget);
                res.sendStatus(200);
            }, function (error) {
                console.log("inside error");
                res.sendStatus(500).send(error);
            });

    }


    function uploadImage(req, res) {

        var pageId = req.body.pageId;
        // console.log(pageId);
        var widgetId = req.body.widgetId;
        var width = "100%";
        //console.log("wif"+width);
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        if (myFile) {
            var destination = myFile.destination; // folder where file is saved to
            var url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

            widgetModel
                .findWidgetById(widgetId)
                .then(function (widget) {
                widget.url=url;
                    widget.url = url;
                    widgetModel
                        .updateWidget(widgetId, widget)
                        .then(function (widget) {
                            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                        }, function (error) {
                            res.sendStatus(500).send(error);
                        });

                }, function (error) {console.log(widget);
                    res.sendStatus(500).send(error);
                });




        }
    }

};