var myApp = angular.module('menuBar.controller');

myApp.controller('MenuBarController', ['$rootScope','$log', '$state','$timeout','$location','$mdSidenav','$mdUtil','$scope', '$http', 'menu', 'restAPI', function ($rootScope, $log, $state, $timeout, $location, $mdSidenav, $mdUtil, $scope, $http, menu, restAPI) {

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
    
    // list restaurants
    $scope.getListRestaurants = function () {
        var promise = restAPI.get("/api/dashboard/getallrestaurant")
        promise.then(
            function (response) {
                if (response.data.result) {
                    $scope.listRestaurant = response.data.data
                    var contact = [];
                    for (var index in $scope.listRestaurant) {
                        var pages = [];
                        for (j = 0; j < $scope.listRestaurant[index].length; j++) {
                            pages.push({
                                name: $scope.listRestaurant[index][j].name,
                                state: 'menu.restaurant.' + $scope.listRestaurant[index][j].id,
                                type: 'link'
                            })
                            contact.push({
                                name: 'menu.restaurant.' + $scope.listRestaurant[index][j].id,
                                url: '/' + $scope.listRestaurant[index][j].id,
                                views: {
                                    'content@menu': {
                                        templateUrl: '/js/templates_dashboard/restaurant_view.html',
                                        controller: "restaurantController"
                                    }
                                }
                            });
                        }
                        menu.sections.push({
                            name: index,
                            type: 'toggle',
                            icon: 'home',
                            pages: pages
                        })
                    }
                    $rootScope.$broadcast('listState', contact)
                }
                else {
                    alert("error")
                }
            },
            function (error) {
                alert("error server")
            }
        )
    }
    $scope.getListRestaurants();
    
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
