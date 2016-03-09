var myApp = angular.module('dashboard.service')
myApp.service("uploadFile", ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('image', file.files[0]);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data, status, headers, config){
            return data
        })
        .error(function(){
        });
    }
}])
