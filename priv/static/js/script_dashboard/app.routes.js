var myApp = angular.module('ZentechRestor', ['menuBar.controller']);
myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
   $stateProvider
        .state('menu',{
            url: '/',
            views: {
                '@': {
                    templateUrl: '/js/templates_dashboard/menuBar_view.html',
                    controller: "MenuBarController as mc"
                }
            }
        })
        .state('menu.home',{
            url: 'home',
            views: {
                'content@menu': {
                    templateUrl: '/js/templates_dashboard/home_view.html',
                    controller: "HomeController"
                }
            }
        })
//    $urlRouterProvider.otherwise("home");
}]);
//take all whitespace out of string
myApp.filter('nospace', function () {
      return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
      };
});
//replace uppercase to regular case
myApp.filter('humanizeDoc', function () {
      return function (doc) {
        if (!doc) return;
        if (doc.type === 'directive') {
          return doc.name.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
          });
        }
        
        return doc.label || doc.name;
      };
});