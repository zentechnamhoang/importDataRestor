var myApp = angular.module('login_controller');
myApp.controller("LoginController", ["$scope", "restAPI", function($scope, restAPI){
    $scope.logIn = function () {
        var params = {"username": $scope.email, "password": $scope.password}
        var promise = restAPI.post(params, '/api/authen/login')
        promise.then(
            function (response) {
                if (response.data.result) {
                    $scope.resultLogin = {status: "success", mes: "Login success"}
                    document.location.href = "/dashboard";
                }
                else {
                    $scope.resultLogin = {status: "error", mes: response.data.mes + ", " + response.data.reason}
                }
            },
            function (error) {
                $scope.resultLogin = {status: "error", mes: "Request failure"}
            }
        )
    }
}]);