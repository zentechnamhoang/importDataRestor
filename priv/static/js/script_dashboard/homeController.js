var myApp = angular.module('home.controller');
myApp.controller("HomeController", ['$scope','$mdDialog', '$rootScope', '$mdMedia', 'dialog', 'productService', "restAPI", function ($scope, $mdDialog, $rootScope, $mdMedia, dialog, productService, restAPI){
    // select open and close time
    $scope.time = ["12:00 a.m", "12:30 a.m", "1:00 a.m", "1:30 a.m", "2:00 a.m", "2:30 a.m", "3:00 a.m", "3:30 a.m", "4:00 a.m", "4:30 a.m", "5:00 a.m", "5:30 a.m", "6:00 a.m", "6:30 a.m", "7:00 a.m", "7:30 a.m", "8:00 a.m", "8:30 a.m", "9:00 a.m", "9:30 a.m", "10:00 a.m", "10:30 a.m", "11:00 a.m", "11:30 a.m", "12:00 p.m", "12:30 p.m", "1:00 p.m", "1:30 p.m", "2:00 p.m", "2:30 p.m", "3:00 p.m", "3:30 p.m", "4:00 p.m", "4:30 p.m", "5:00 p.m", "5:30 p.m", "6:00 p.m", "6:30 p.m", "7:00 p.m", "7:30 p.m", "8:00 p.m", "8:30 p.m", "9:00 p.m", "9:30 p.m", "10:00 p.m", "10:30 p.m", "11:00 p.m", "11:30 p.m"]
    
    // mouse enter-leave 
    
    // mouseenter event
    $scope.showIt = function () {
        $scope.showButton = true;
    };
    
    // mouseleave event
    $scope.hideIt = function () {
        $scope.showButton = false;
    };
    // list images
    $scope.images = [];
    $rootScope.$on("home", function (ev, params) {
        $scope.images.push(params)
    })
    
    // button dialog list type of restaurant
    $scope.showDialogTypesOfRes = function(ev) {
        dialog.showDialog(ev, '/js/templates_dashboard/dialog_listTypesOfRestaurant.html');
    }
    // list types of restaurant
    $scope.types = [];
    $rootScope.$on("typesOfRestaurant", function (ev, params) {
        $scope.types.push(params)
    })
    
    // config dialog content image cropper
    $scope.showDialogUploadImage = function(ev) {
        productService.addProduct("home")
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
    // lon-lat after confirm address
    $rootScope.$on("lonLatAddress", function (ev, params) {
        $scope.longPosition = params.lon;
        $scope.latPosition = params.lat;
    })
    
    $scope.createNewRestaurant = function () {
        // supports of restaurant
        $scope.supports = [];
        if ($scope.isDinein) {
            $scope.supports.push("dinner")
        }
        if ($scope.isBooking) {
            $scope.supports.push("booking")
        }
        if ($scope.isDelivery) {
            $scope.supports.push("delivery")
        }
        if ($scope.isPickup) {
            $scope.supports.push("pickup")
        }
        if ($scope.isCheckin) {
            $scope.supports.push("checkin")
        }
        if ($scope.isDriveThrough) {
            $scope.supports.push("drivethrough")
        }
        // pos type of restaurant
        $scope.posType = [];
        if ($scope.isBNB) {
            $scope.supports.push("BNB")
        }
        if ($scope.isSquare) {
            $scope.supports.push("Square")
        }
        // Tips of restaurant
        $scope.tips = [];
        if ($scope.isTipOne) {
            $scope.tips.push("10%")
        }
        if ($scope.isTipTwo) {
            $scope.tips.push("15%")
        }
        if ($scope.isTipThree) {
            $scope.tips.push("20%")
        }
        // Fees of restaurant
        $scope.fees = [];
        if ($scope.isFeeOne) {
            $scope.fees.push($scope.feeOne)
        }
        if ($scope.isFeeTwo) {
            $scope.fees.push($scope.feeTwo)
        }
        if ($scope.isFeeThree) {
            $scope.fees.push($scope.feeThree)
        }
        // Payment methods of restaurant
        $scope.paymentMethods = []
        if ($scope.useCash) {
            $scope.paymentMethods.push("cash")
        }
        if ($scope.useVisa) {
            $scope.paymentMethods.push("visa")
        }
        if ($scope.useDebit) {
            $scope.paymentMethods.push("debit")
        }
        if ($scope.useCheque) {
            $scope.paymentMethods.push("cheque")
        }
        
        var params = {"name": $scope.name, "types": $scope.types, "address": $scope.address, "phone_numbers": $scope.phoneNumbers, "status": $scope.status, "open_time": $scope.openTime, "close_time": $scope.closeTime, "country": $scope.country, "state": $scope.state, "city": $scope.city, "long_position": $scope.longPosition, "lat_position": $scope.latPosition, "zip_code": $scope.zipCode, "district": $scope.district, "ward": $scope.ward, "supports": $scope.supports, "pos_type": $scope.posType, "time_zone": $scope.timezone, "tax": $scope.tax, "tips": $scope.tips, "fees": $scope.fees, "franchise_id": $scope.franchiseId, "payment_methods": $scope.paymentMethods, "images": $scope.images}
        
        var promise = restAPI.post(params, "/api/dashboard/createrestaurant")
        promise.then(
            function (response) {
                if (response.data.result) {
                    alert("ok")
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
}]);
    