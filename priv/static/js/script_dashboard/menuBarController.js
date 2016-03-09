var myApp = angular.module('menuBar.controller');

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
