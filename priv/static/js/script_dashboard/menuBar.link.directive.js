var myApp = angular.module('common.directives')
myApp.run(['$templateCache', function ($templateCache) {
      $templateCache.put('partials/menu-link.tmpl.html',
        '<md-button class="md-button-toggle" ui-sref-active="active" \n' +
        '  ui-sref="{{section.state}}" ng-click="focusSection()">\n' +
        '  <md-icon style="color: sandybrown; font-size:28px; with:30px" >{{ section.icon }}</md-icon>\n'+
        '  <span style="margin-left: 20px;font-size:18px;color: sandybrown;">{{section | humanizeDoc}}</span>\n' +
        '  <span  class="md-visually-hidden "\n' +
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