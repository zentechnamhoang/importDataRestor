var myApp = angular.module('common.directives')
myApp.run(['$templateCache', function ($templateCache) {
      $templateCache.put('partials/menu-link.tmpl.html',
        '<md-button class="md-button-toggle" ui-sref-active="active" \n' +
        '  ui-sref="{{section.state}}" ng-click="focusSection()">\n' +
        '  <md-icon class="format-font-sidenav icon-sidenav" >{{ section.icon }}</md-icon>\n'+
        '  <span class="format-font-sidenav">{{section | humanizeDoc}}</span>\n' +
        '  <span class="md-visually-hidden "\n' +
        '    ng-if="isSelected()">\n' + 
        '    current page\n' +
        '  </span>\n' +
        '</md-button>\n' +
        '');
}]);
myApp.directive('menuLink', function () {
    return {
        scope: {
            section: '='
        },
        templateUrl: 'partials/menu-link.tmpl.html',
        link: function ($scope, $element) {
            var controller = $element.parent().controller();
            $scope.focusSection = function () {
                controller.autoFocusContent = true;
            };
        }
    };
});