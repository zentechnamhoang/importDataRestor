var myApp = angular.module('common.directives')
myApp.run(['$templateCache', function ($templateCache) {
      $templateCache.put('partials/menu-toggle.tmpl.html',
        '<md-button class="md-button-toggle"\n' +
        '  ng-click="toggle()"\n' +
        '  aria-controls="docs-menu-{{section.name | nospace}}"\n' +
        '  flex layout="row"\n' +
        '  aria-expanded="{{isOpen()}}">\n' +
        '  <span style="width:30px; font-size: 18px" ng-class="{\'{{section.icon}}\' : true}"></span>\n'+
        '  <span style="margin-left: 20px; font-size: 18px">{{section.name}}</span>\n' +
        '  <span aria-hidden="true" class=" pull-right fa fa-chevron-down md-toggle-icon"\n' +
        '  ng-class="{\'toggled\' : isOpen()}"></span>\n' +
        '</md-button>\n' +
        '<ul ng-show="isOpen()" id="docs-menu-{{section.name | nospace}}" class="menu-toggle-list">\n' +
        '  <li ng-repeat="page in section.pages">\n' +
        '    <menu-link section="page"></menu-link>\n' +
        '  </li>\n' +
        '</ul>\n' +
        '');
}]);
 myApp.directive('menuToggle', ['$timeout', function ($timeout ) {
      return {
        scope: {
          section: '='
        },
        templateUrl: 'partials/menu-toggle.tmpl.html',
        link: function (scope, element) {
          var controller = element.parent().controller();

          scope.isOpen = function () {
            return controller.isOpen(scope.section);
          };
          scope.toggle = function () {
            controller.toggleOpen(scope.section);
          };
        }
      };
 }]);