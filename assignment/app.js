module.exports=function(app){
    var userModel=require("./model/user/user.model.server");
    var websiteModel=require("./model/website/website.model.server");
    var pageModel=require("./model/page/page.model.server");


    require("./services/user.service.server")(app);
    require("./services/website.service.server")(app);
    require("./services/widget.service.server")(app);
    require("./services/page.service.server")(app);


}