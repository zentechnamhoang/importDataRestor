var myApp = angular.module('common.directives')
myApp.run(['$templateCache', function ($templateCache) {
      $templateCache.put('partials/menu-toggle.tmpl.html',
        '<md-button class="md-button-toggle"\n' +
        '  ng-click="toggle()"\n' +
        '  aria-controls="docs-menu-{{section.name | nospace}}"\n' +
        '  flex layout="row"\n' +
        '  aria-expanded="{{isOpen()}}">\n' +
        '  <md-icon style="color: sandybrown; font-size:28px; margin-top:-12px;" >{{ section.icon }}</md-icon>\n'+
        '  <span style="margin-left: 20px; font-size: 18px; color: sandybrown;">{{section.name}}</span>\n' +
        '  <md-icon aria-hidden="true" style="color: sandybrown; font-size:28px; margin-top:-8px;margin-left: 80px;" class="md-toggle-icon" ng-class="{\'toggled\' : isOpen()}">expand_more</md-icon>\n'+        
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
    link: function ($scope, $element) {
        var controller = $element.parent().controller();

        $scope.isOpen = function () {
        return controller.isOpen($scope.section);
        };
        $scope.toggle = function () {
        controller.toggleOpen($scope.section);
        };
    }
    };
}]);