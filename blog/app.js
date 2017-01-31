module.exports=function (app) {

    var blogPosts=[

        {title: "hi",content:"world"},

        {title: "hi",content:"world"},
        {title: "hi",content:"world"},
        {title: "hi",content:"world"},
        {title: "hi",content:"world"},
        {title: "hi",content:"world"}
    ];
  app.get('/blog',findAllBlogPosts);
    function findAllBlogPosts(req,res) {
        res.json(blogPosts);
    }
};