var myApp = angular.module('restaurant.controller');
 myApp.controller('restaurantController', ['$scope', '$rootScope', '$mdDialog', '$mdMedia', 'dialog', 'utilFunction', 'productService', function ($scope, $rootScope, $mdDialog, $mdMedia, dialog, utilFunction, productService) {
     // config tree view
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
                    status: true,
                    selected: false,
                    images: [],
                    type: 'menuCategory',
                    nodes: []
                });
                break;
            case "menuCategory":
                scope.$modelValue.nodes.push({
                    name: 'item1',
                    status: true,
                    selected: false,
                    images: [],
                    type: 'menuItem'
                });
                break;
        };
    };
    
    $scope.newMenu = function() {
        $scope.data.push({
            name: 'menu',
            status: true,
            selected: false,
            type: 'menu',
            nodes: [] 
        });
    }

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
    
    // database
    
    $rootScope.data = [{
        'id': '1',
        'name': 'menu',
        'status': true,
        'selected': false,
        'type': 'menu',
        'nodes': [{
            'id': '1',
            'name': 'cate',
            'status': true,
            'selected': false,
            'images': [],
            'type': 'menuCategory',
            'nodes': [{
                'id': '1',
                'name': 'item',
                'status': true,
                'selected': false,
                'images': [],
                'type': 'menuItem',
            }]
        }]
    }];
    
    // add data menu item after create
    
    
    // mouse enter-leave 
    
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
    
    //respository image
    
    $rootScope.uploadedImages = [];
    
    //button delete image
    $scope.deleteImage = function (image) {
        var position = $rootScope.uploadedImages.indexOf(image)
        $rootScope.uploadedImages.splice(position, 1)
    }
    
    // button dialog add price point
    $scope.showDialogAddSize = function(ev) {
        dialog.showDialog(ev, '/js/templates_dashboard/dialog_size.html');
    }
    
    //button dialog add option set
    $scope.showDialogAddOptionSet = function(ev) {
        dialog.showDialog(ev, '/js/templates_dashboard/dialog_option.html');
    }
    
    //button dialog add menu Item or menu category or menu
    $scope.showDialogCreateNew = function(scope, ev) {
        switch(scope.$modelValue.type) {
            case "menu":
                productService.addProduct(scope.$modelValue.id)
                dialog.showDialog(ev, '/js/templates_dashboard/dialog_addCategory.html');
                break;
            case "menuCategory":
                productService.addProduct(scope.$modelValue.id)
                dialog.showDialog(ev, '/js/templates_dashboard/dialog_addItem.html');
                break;
        };
    }
    
    // database price point and option set
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
    
    $scope.longLat = utilFunction.getLongLatFromAddress("273 Điện Biên Phủ", "phường 7", "quận 3", "thành phố Hồ Chí Minh", "Việt Nam")
    
 }]);
 
 


