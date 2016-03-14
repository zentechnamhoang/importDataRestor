var myApp = angular.module('restaurant.controller');
 myApp.controller('restaurantController', ['$scope', '$rootScope', '$mdDialog', '$mdMedia', 'dialog', 'utilFunction', function ($scope, $rootScope, $mdDialog, $mdMedia, dialog, utilFunction) {
     $scope.remove = function (scope) {
        scope.remove();
    };

    $scope.toggle = function (scope) {
        scope.toggle();
    };

    $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
    };

    $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        switch(nodeData.type) {
            case "menu":
                scope.$modelValue.nodes.push({
                    name: 'cate1',
                    status: 'active',
                    images: [],
                    type: 'menuCategory',
                    nodes: []
                });
                break;
            case "menuCategory":
                scope.$modelValue.nodes.push({
                    name: 'item1',
                    status: 'active',
                    images: [],
                    type: 'menuItem'
                });
                break;
        };
    };

    $scope.collapseAll = function () {
        $scope.$broadcast('angular-ui-tree:collapse-all');
    };

    $scope.expandAll = function () {
        $scope.$broadcast('angular-ui-tree:expand-all');
    };
    
    
    $scope.chosen = function (node) {
        $scope.node = node;
        $scope.node.selected = !node.selected;
    }
    
    $scope.treeOptions = {
        beforeDrag: function(e) {
            $scope.chosen(e.node);
            return true
        },
        beforeDrop: function (e) {
            var sourceType = e.source.nodeScope.$modelValue.type,
                destType = e.dest.nodesScope.node ? e.dest.nodesScope.node.type : undefined
                
            // display modal if the node is being dropped into a smaller container
            if (sourceType == "menuItem" && destType == "menuCategory") {
                return true
            }
            else if (sourceType == "menuCategory" && destType == "menu") {
                return true
            }
            else {
                //show message
                return false
            }  
        }
    }
    
    $scope.data = [{
        'name': 'menu',
        'status': 'active',
        'selected': false,
        'type': 'menu',
        'nodes': [{
            'name': 'cate',
            'status': 'active',
            'selected': false,
            'images': [],
            'type': 'menuCategory',
            'nodes': [{
                'name': 'item',
                'status': 'active',
                'selected': false,
                'images': [],
                'type': 'menuItem',
            }]
        }]
    }];
    
    
    // mouseenter event
    $scope.showIt = function () {
        $scope.showButton = true;
    };
    
    // mouseleave event
    $scope.hideIt = function () {
        $scope.showButton = false;
    };
    
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
    
    $scope.showDialogAddSize = function(ev) {
        dialog.showDialog(ev, '/js/templates_dashboard/dialog_size.html');
    }
    
    $scope.showDialogAddOptionSet = function(ev) {
        dialog.showDialog(ev, '/js/templates_dashboard/dialog_option.html');
    }
    
    $rootScope.uploadedImages = [];
    $scope.deleteImage = function (image) {
        var position = $rootScope.uploadedImages.indexOf(image)
        $rootScope.uploadedImages.splice(position, 1)
    }
    
 }]);
 function DialogController($scope, $mdDialog, $rootScope, uploadFile, utilFunction) {
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.uploadImage = function() {
        var fileName = document.getElementById("inputFile").files[0].name;
        var file = utilFunction.dataURItoBlob(this.cropper.croppedImage)
        var promise = uploadFile.uploadFileToUrl(file, '/api/upload/uploadfile', fileName)
        promise.then(
            function (data) {
                if (data.data.result) {
                    $rootScope.uploadedImages.push(data.data.data);
                    $mdDialog.cancel();
                }
                else {
                    //error
                    $mdDialog.cancel();
                }
            },
            function (error) {
                //error
                $mdDialog.cancel();
            }
        )
    }
    $scope.saveSize = function() {
    }
    $scope.saveOption = function() {
    }
    $scope.moreCurrency = ('USD VND').split(' ').map(function(unit) {return { unit: unit }; });
    
    $scope.addOneMorePricePoint = function() {
        var date = new Date();
        $scope.pricePoints.push({
            'id': Date.parse(date),
            'name': $scope.nameSize,
            'price': $scope.priceSize,
            'currencyUnit': $scope.currencyUnitSize
        })
        $scope.nameSize = "";
        $scope.priceSize = "";
        $scope.currencyUnitSize = "";
    }
    
    $scope.addOneMoreOptionSet = function() {
        var date = new Date();
        $scope.optionSet.push({
            'id': Date.parse(date),
            'name': $scope.nameOption,
            'price': $scope.priceOption,
            'currencyUnit': $scope.currencyUnitOption
        })
        $scope.nameOption = "";
        $scope.priceOption = "";
        $scope.currencyUnitOption = "";
    }
    
    $scope.removeOnePricePoint = function(id) {
        var position = utilFunction.indexOfObject(id, $scope.pricePoints);
        $scope.pricePoints.splice(position, 1);
    }
    
    $scope.removeOneOptionSet = function(id) {
        var position = utilFunction.indexOfObject(id, $scope.optionSet);
        $scope.optionSet.splice(position, 1);
    }
    
    $scope.editOnePricePoint = function(id) {
        var position = utilFunction.indexOfObject(id, $scope.pricePoints);
        $scope.nameSize = $scope.pricePoints[position].name;
        $scope.priceSize = $scope.pricePoints[position].price;
        $scope.currencyUnitSize = $scope.pricePoints[position].currencyUnit;
        $scope.pricePoints.splice(position, 1);
    }
    
    $scope.editOneOptionSet = function(id) {
        var position = utilFunction.indexOfObject(id, $scope.optionSet);
        $scope.nameOption = $scope.optionSet[position].name;
        $scope.priceOption = $scope.optionSet[position].price;
        $scope.currencyUnitOption = $scope.optionSet[position].currencyUnit;
        $scope.optionSet.splice(position, 1);
    }
    
    $scope.pricePoints = [{
        'id': 1,
        'name': 'Large',
        'price': '20',
        'currencyUnit': 'USD'
    },
    {
        'id': 2,
        'name': 'Medium',
        'price': '10',
        'currencyUnit': 'USD'
    }]
    $scope.optionSet = [{
        'id': 1,
        'name': 'Onion',
        'price': '2',
        'currencyUnit': 'USD'
    },
    {
        'id': 2,
        'name': 'Pimento',
        'price': '1',
        'currencyUnit': 'USD'
    }]
    
    
}


