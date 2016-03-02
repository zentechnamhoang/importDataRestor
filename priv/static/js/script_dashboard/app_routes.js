var myApp = angular.module('ZentechRestor', ['menuBar_controller', 'ngMaterial', 'ui.router']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
   $stateProvider
        .state('menu',{
            url: '/',
             templateUrl: '/js/templates_dashboard/menuBar_view.html',
              controller: "MenuBarController"
        })
        // .state('menu.home',{
        //     url: 'home',
        //     views: {
        //         'content@menu': {
        //             templateUrl: '/js/templates_dashboard/home.html',
        //             //controller: "HomeController"
        //         }
        //     }
        // })
   $urlRouterProvider.otherwise("home");
}]);