var myApp = angular.module('authen.directive')
myApp.directive("compareTo", function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };

});
myApp.directive('notification', function($timeout){
  return {
     restrict: 'E',
     replace: true,
     link: function(scope, element, attrs){
         $timeout(function(){
             element.remove();
         }, 5000);
     }
  }
});