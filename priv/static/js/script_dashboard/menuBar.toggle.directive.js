var myApp = angular.module('common.directives')
myApp.run(['$templateCache', function ($templateCache) {
      $templateCache.put('partials/menu-toggle.tmpl.html',
        '<md-button class="md-button-toggle md-ink-ripple"\n' +
        '  ng-click="toggle()"\n' +
        '  aria-controls="docs-menu-{{section.name | nospace}}"\n' +
        '  aria-expanded="{{isOpen()}}">\n' +
        '  <div flex layout="row">' +
        '  <md-icon class="format-font-sidenav icon-sidenav">{{ section.icon }}</md-icon>\n'+
        '  <span class="format-font-sidenav">{{section.name}}</span>\n' +
        '  <span flex></span>\n' +
        '  <md-icon aria-hidden="true" class="format-font-sidenav md-toggle-icon" ng-class="{\'toggled\' : isOpen()}">expand_more</md-icon>\n'+        
        ' </div>' +
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