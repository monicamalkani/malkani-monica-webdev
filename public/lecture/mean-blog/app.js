//modules fetch data and relates them..provides data to controller..
//controller to view
//users perform action and send to controller->m
angular
    .module('BlogApp',[])//doesn't depend on other modules
    .controller('blogController',blogController);

function blogController($scope,$http) {
    $http.get('/blog').success(function (response) {
        console.log(response);
        $scope.blogPosts=response;
    })
    $scope.post={};
    $scope.blogPosts=[

        {title: "hi",content:"world"},

        {title: "hi",content:"world"},
        {title: "hi",content:"world"},
        {title: "hi",content:"world"},
        {title: "hi",content:"world"},
        {title: "hi",content:"world"}
    ];
    $scope.createPost=function (post) {
        console.log(post);
        var newBlog={
            title:post.title,
            content:post.content

        };
        $scope.blogPosts.push(newBlog);

    }

    
    $scope.deletePost=deletePost;
    $scope.updatePost=updatePost;
    $scope.selectPost=selectPost;

    function selectPost(post) {
        $scope.indexPost=$scope.blogPosts.indexOf(post);
        $scope.post.title=post.title;
        $scope.post.content=post.content;


    }
        function deletePost(post) {
            var indexPost=$scope.blogPosts.indexOf(post);
            $scope.blogPosts.splice(indexPost,1);

        
    }
    function updatePost(post) {

        $scope.blogPosts[$scope.indexPost].title=post.title;
        $scope.blogPosts[$scope.indexPost].content=post.content;
        $scope.post={};
    }
}
