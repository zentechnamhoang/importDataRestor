var myApp = angular.module('signUp_controller');
myApp.controller("SignupController", ["$scope", "restAPI", function($scope, restAPI){
    $scope.signUp = function () {
        var params = {"first_name": $scope.firstName, "last_name": $scope.lastName, "address": $scope.address, "email": $scope.email, "phone_number": $scope.phoneNumber, "password": $scope.password}
        var promise = restAPI.post(params, '/api/authen/signup')
        promise.then(
            function (response) {
                if (response.data.result) {
                    $scope.resultSignUp = {status: "success", mes: "Sign up success"}
                }
                else {
                    $scope.resultSignUp = {status: "error", mes: response.data.mes + ", " + response.data.reason}
                }
            },
            function (error) {
                $scope.resultSignUp = {status: "error", mes: "Request failure"}
            }
        )
    }
}]);