var myApp = angular.module('restaurant.controller');
 myApp.controller('restaurantController', ['$scope', '$rootScope', '$mdDialog', '$mdMedia', function ($scope, $rootScope, $mdDialog, $mdMedia) {
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
    }
    
    $scope.treeOptions = {
        beforeDrag: function(e) {
            $scope.chosen(e.node);
            return true
        },
        beforeDrop : function (e) {
            var sourceType = e.source.nodeScope.$modelValue.type,
                destType = e.dest.nodesScope.node ? e.dest.nodesScope.node.type : undefined,
                modalInstance;

            // display modal if the node is being dropped into a smaller container
            if (sourceType == "menuItem" && (destType == "menuItem" || destType == "menu")) {
                //show message
                return false
            }
            else if (sourceType == "menuCategory" && (destType == "menuItem" || destType == "menuCategory")) {
                return false
            }
            else if (sourceType == "menu" && (destType == "menuItem" || destType == "menuCategory" || destType == "menu")) {
                return false
            }
            else {
                return true
            }    
        }
    }
    
    $scope.data = [{
        'name': 'menu',
        'status': 'active',
        'type': 'menu',
        'nodes': [{
            'name': 'cate',
            'status': 'active',
            'images': [],
            'type': 'menuCategory',
            'nodes': [{
                'name': 'item',
                'status': 'active',
                'images': [],
                'type': 'menuItem',
            }]
        }]
    }];
      
    $scope.cropper = {};
    $scope.cropper.sourceImage = null;
    $scope.cropper.croppedImage   = null;
    $scope.bounds = {};
    $scope.bounds.left = 0;
    $scope.bounds.right = 0;
    $scope.bounds.top = 0;
    $scope.bounds.bottom = 0;
    
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showAdvanced = function(ev, image) {
        $scope.cropper.sourceImage = image;
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/js/templates_dashboard/upload_images.html',
            parent: angular.element(document.querySelector('#div-dashboard-super-container')),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        });
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
    
    
 }]);
 function DialogController($scope, $mdDialog, uploadFile) {
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.uploadImage = function () {
        var file = document.getElementById("inputFile");
        var respone = uploadFile.uploadFileToUrl(file, '/api/upload/uploadfile')
    }
}


