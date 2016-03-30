var myApp = angular.module('dashboard.service')
myApp.service("uploadFile", ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, name){
        var fd = new FormData(document.forms[0]);
        fd.append('image', file, name);
        return $http.post(uploadUrl, fd, {transformRequest: angular.identity,headers: {'Content-Type': undefined}})
    }
}]);
myApp.service("dialog", ['$mdMedia', '$mdDialog', function ($mdMedia, $mdDialog) {
    this.showDialog = function(ev, templateUrl) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $mdMedia('xs') || $mdMedia('sm');
        $mdDialog.show({
            controller: DialogController,
            templateUrl: templateUrl,
            parent: angular.element(document.querySelector('#div-dashboard-super-container')),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        });
    };
}])
myApp.service('utilFunction', function () {
    this.dataURItoBlob =  function(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }
    this.indexOfObject = function(id, object) {
        var position = 0;
        for (i = 0; i < object.length; i++) {
            if (id == object[i].id) {
                position = i;
                break;
            }
        }
        return position;
    }
    
})

myApp.service('restAPI', function($http){
    this.post = function(params, path) {
        return $http.post(path, params)
    }
    this.get = function(path) {
        return $http.get(path)
    }
    this.put = function(params, path) {
        return $http.put(path, params)
    }
});
myApp.service('productService', function() {
  var productList = [];

  var addProduct = function(newObj) {
      productList = [];
      productList.push(newObj);
  };

  var getProducts = function(){
      return productList;
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts
  };

});



