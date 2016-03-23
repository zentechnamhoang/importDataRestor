var myApp = angular.module('home.controller');
myApp.controller("HomeController", ['$scope','$mdDialog', '$rootScope', '$mdMedia', 'dialog', function ($scope, $mdDialog, $rootScope, $mdMedia, dialog){
    // mouse enter-leave 
    
    // mouseenter event
    $scope.showIt = function () {
        $scope.showButton = true;
    };
    
    // mouseleave event
    $scope.hideIt = function () {
        $scope.showButton = false;
    };
    
    $rootScope.uploadedImages = [];
    
    // button dialog list type of restaurant
    $scope.showDialogTypesOfRes = function(ev) {
        dialog.showDialog(ev, '/js/templates_dashboard/dialog_listTypesOfRestaurant.html');
    }
    // config dialog content image cropper
    $scope.showDialogUploadImage = function(ev) {
        $scope.cropper = {};
        $scope.cropper.sourceImage = null;
        $scope.cropper.croppedImage   = null;
        $scope.bounds = {};
        dialog.showDialog(ev, '/js/templates_dashboard/upload_images.html');
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    }
    // button open dialog Google Map
    $scope.showDialogMap = function (ev) {
        dialog.showDialog(ev, '/js/templates_dashboard/dialog_map.html');
    }
}]);
    