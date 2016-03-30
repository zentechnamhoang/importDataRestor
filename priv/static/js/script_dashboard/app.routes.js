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
        .state('menu.restaurant', {
            url: 'restaurant',
            abstract: true
        })
    $urlRouterProvider.otherwise("home");
    $stateProviderRef = $stateProvider;
}]);

myApp.run(['$q', '$rootScope', '$state', function($q, $rootScope, $state){
    $rootScope.$on('listState', function(ev, params){
        angular.forEach(params, function (value, key) { 
            var state = {
                url: value.url,
                views: {
                    'content@menu': {
                        templateUrl: value.views["content@menu"].templateUrl,
                        controller: value.views["content@menu"].controller
                    }
                }
            };
            $stateProviderRef.state(value.name, state);
        });
    });
    
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