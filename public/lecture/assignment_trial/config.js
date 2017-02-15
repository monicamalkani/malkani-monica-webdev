(function () {
    angular
        .module("WebAppMaker")//read
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login",{
                templateUrl: "user/templates/login.view.client.html",
                controller:"LoginController",
                controllerAs:"loginController"
            })
            .when("/register",{
                templateUrl: "user/templates/register.view.client.html"
            })
            .when("/user/:uid",{
                templateUrl: "user/templates/profile.view.client.html",
                controller:"ProfileController",
                controllerAs:"profileController"
            })
            .when("/user/:uid/website",{
                    templateUrl: "website/templates/website-list.view.client.html",
                controller:"WebsiteListController",
                controllerAs:"WebsiteController"
                })
            .when("/user/:uid/website/new",{
                templateUrl: "website/templates/website-new.view.client.html",

            })
        .when("/user/:uid/website/:wid",{
            templateUrl: "website/templates/website-edit.view.client.html",
            controller:"WebsiteEditController",
            controllerAs:"model"

          })
            .when("/user/:uid/website/:wid/page/:pid/widget/",{
                templateUrl: "Widget-page/templates/widget-list.view.client.html"
                // controller:"WebsiteEditController",
                // controllerAs:"model"

            });


    }

})();