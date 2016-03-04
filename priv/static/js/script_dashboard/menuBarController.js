var myApp = angular.module('menuBar.controller');
// myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
//    $stateProvider
//         .state('menu',{
//             url: '/',
//             views: {
//                 '@': {
//                     templateUrl: '/js/templates_dashboard/menuBar_view.html',
//                     controller: "MenuBarController as mc"
//                 }
//             }
//         })
//         // .state('menu.home',{
//         //     url: 'home',
//         //     views: {
//         //         'content@menu': {
//         //             templateUrl: '/js/templates_dashboard/home_view.html',
//         //             controller: "HomeController"
//         //         }
//         //     }
//         // })
//    $urlRouterProvider.otherwise("home");
// }]);

myApp.controller('MenuBarController', ['$rootScope','$log', '$state','$timeout','$location','$mdSidenav','$mdUtil','$scope', '$http', 'menu', function ($rootScope, $log, $state, $timeout, $location, $mdSidenav, $mdUtil, $scope, $http, menu) {

    $scope.valueRight=true;
    $scope.toggleLeft = buildToggler('left');
    $scope.lock=true;
    function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
            $scope.valueRight=!$scope.valueRight;
            $mdSidenav(navID)
            .toggle()
            .then(function () {
                $log.debug("toggle " + navID + " is done");
            });
        },300);
        return debounceFn;
    }
    var mc = this;
    //functions for menu-link and menu-toggle
    mc.isOpen = isOpen;
    mc.toggleOpen = toggleOpen;
    mc.autoFocusContent = false;
    mc.menu = menu;

    mc.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };


    function isOpen(section) {
        return menu.isSectionSelected(section);
    }

    function toggleOpen(section) {
        menu.toggleSelectSection(section);
    }
}]);

// myApp.run(['$templateCache', function ($templateCache) {
//       $templateCache.put('partials/menu-link.tmpl.html',
//         '<md-button class="md-button-toggle" ui-sref-active="active" \n' +
//         '  ui-sref="{{section.state}}" ng-click="focusSection()">\n' +
//         '  <span style="width:30px; font-size: 16px;"ng-class="{\'{{section.icon}}\' : true}"></span>\n'+
//         '  <span style="margin-left: 20px;">{{section}}</span>\n' +
//         '  <span  class="md-visually-hidden "\n' +
//         '    ng-if="isSelected()">\n' + 
//         '    current page\n' +
//         '  </span>\n' +
//         '</md-button>\n' +
//         '');
// }]);
// myApp.directive('menuLink', function () {
//     return {
//         scope: {
//             section: '='
//         },
//         templateUrl: 'partials/menu-link.tmpl.html',
//         link: function ($scope, $element) {
//             var controller = $element.parent().controller();
//             $scope.focusSection = function () {
//                 controller.autoFocusContent = true;
//             };
//         }
//     };
// });
// myApp.run(['$templateCache', function ($templateCache) {
//       $templateCache.put('partials/menu-toggle.tmpl.html',
//         '<md-button class="md-button-toggle"\n' +
//         '  ng-click="toggle()"\n' +
//         '  aria-controls="docs-menu-{{section.name}}"\n' +
//         '  flex layout="row"\n' +
//         '  aria-expanded="{{isOpen()}}">\n' +
//         '  <span style="width:30px; font-size: 18px" ng-class="{\'{{section.icon}}\' : true}"></span>\n'+
//         '  <span style="margin-left: 20px; font-size: 18px">{{section.name}}</span>\n' +
//         '  <span aria-hidden="true" class=" pull-right fa fa-chevron-down md-toggle-icon"\n' +
//         '  ng-class="{\'toggled\' : isOpen()}"></span>\n' +
//         '</md-button>\n' +
//         '<ul ng-show="isOpen()" id="docs-menu-{{section.name}}" class="menu-toggle-list">\n' +
//         '  <li ng-repeat="page in section.pages">\n' +
//         '    <menu-link section="page"></menu-link>\n' +
//         '  </li>\n' +
//         '</ul>\n' +
//         '');
// }]);
// myApp.directive('menuToggle', ['$timeout', function ($timeout ) {
//     return {
//     scope: {
//         section: '='
//     },
//     templateUrl: 'partials/menu-toggle.tmpl.html',
//     link: function (scope, element) {
//         var controller = element.parent().controller();

//         scope.isOpen = function () {
//         return controller.isOpen(scope.section);
//         };
//         scope.toggle = function () {
//         controller.toggleOpen(scope.section);
//         };
//     }
//     };
// }]);
// myApp.factory('menu', ['$location', function ($location) {
//     var sections = [{
//         name: 'Home',
//         state: 'menu.home',
//         type: 'link',
//         icon: 'fa fa-home'
//     }];
    
//     sections.push({
//         name: 'Restaurant',
//         type: 'toggle',
//         icon: 'fa fa-home',
//         pages: [{
//             name: 'Restaurant',
//             state: 'menu.restaurant.restaurant',
//             type: 'link'
//         }]
//     });
    
//     var self;
//     return self = {
//         sections: sections,
//         toggleSelectSection: function(section) {
//             self.openedSection = (self.openedSection === section ? null : section)
//         },
//         isSectionSelected: function(section) {
//             return self.openedSection === section;
//         },
//         selectPage: function(section, page) {
//             page && page.url && $location.path(page.url);
//             self.currentSection = section;
//             self.currentPage = page;
//         }
        
//     }
// }]);
