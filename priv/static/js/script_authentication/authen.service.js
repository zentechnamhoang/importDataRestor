var myApp = angular.module('authen.service')
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