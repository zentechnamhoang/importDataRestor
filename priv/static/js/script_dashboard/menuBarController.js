var myApp = angular.module('menuBar_controller');
myApp.controller('MenuBarController1', ['$rootScope','$log', '$state','$timeout','$location','$mdSidenav','$mdUtil','$scope', '$http', function ($rootScope, $log, $state, $timeout, $location, $mdSidenav, $mdUtil, $scope, $http) {

    // $scope.valueRight=true;
    // $scope.toggleLeft = buildToggler('left');
    // $scope.lock=true;
    // function buildToggler(navID) {
    //     var debounceFn =  $mdUtil.debounce(function(){
    //         $scope.valueRight=!$scope.valueRight;
    //         $mdSidenav(navID)
    //         .toggle()
    //         .then(function () {
    //             $log.debug("toggle " + navID + " is done");
    //         });
    //     },300);
    //     return debounceFn;
    // }
    // var mc = this;
    // //functions for menu-link and menu-toggle
    // mc.isOpen = isOpen;
    // mc.toggleOpen = toggleOpen;
    // mc.autoFocusContent = false;
    // // mc.menu = menu;

    // // mc.status = {
    // //     isFirstOpen: true,
    // //     isFirstDisabled: false
    // // };


    // // function isOpen(section) {
    // //     return menu.isSectionSelected(section);
    // // }

    // // function toggleOpen(section) {
    // //     menu.toggleSelectSection(section);
    // // }
}]);

myApp.controller('MenuBarController', [
      '$rootScope',
      '$log',
      '$state',
      '$timeout',
      '$location',
      '$attrs',
      '$mdSidenav',
      '$mdUtil',
      '$scope',
	  '$http',
      'menu',
      function ($rootScope, $log, $state, $timeout, $location, $attrs,$mdSidenav, $mdUtil, $scope, $http, menu) {
        angular.element(document).ready(function () {
			a = document.getElementById('view-content');
			a.style.width = (window.innerWidth - 330) + "px";
		});
        
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
		$scope.reload = false;
        $scope.notifySMS = false
        $scope.notifyCall = false
        $scope.notifyEmail = false
        $scope.autoTopup = false
        
			
		$scope.logResize = function () {
			
			a = document.getElementById('view-content');
			a.style.width = (window.innerWidth - 330) + "px";
		};
		
        
		$scope.progressPage = function(){
			if ($rootScope.indicator == 0){
				return false;
			}
			else{
				return true;
			}
		}
        
        $scope.handleClick = function( event ){
            $rootScope.messageAlertError = false;
            $rootScope.messageAlertSuccess = false;
            $rootScope.messageSuccessUpdateAutoTopup = false
            $rootScope.messageErrorUpdateAutoTopup = false
            $rootScope.messageErrorSaveCardInfo = false
            $rootScope.messageErrorCallChart = false
            $rootScope.messageErrorEmailChart = false
            $rootScope.messageErrorSMSChart = false
            $rootScope.messageErrorSummaryChart = false
            $rootScope.messageErrorHomeChart = false
            $rootScope.messageShowOkIntegration = false;
            $rootScope.messageShowErrorIntegration = false;
            $rootScope.messageCanNotIntegration = false;
        };
        

}]);