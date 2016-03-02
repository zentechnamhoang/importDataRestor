var myApp = angular.module('ZentechRestor', ['login_controller', 'signUp_controller', 'resetPassword_controller', 'ngMaterial', 'ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider){
   $stateProvider
        .state('LogIn',{
            url: '/LogIn',
            templateUrl: '/js/templates_authentication/login.html',
            controller: "LoginController"
            })
        .state('ResetPassword',{
            url: '/ResetPassword',
            templateUrl: '/js/templates_authentication/resetPassword.html',
            controller: "ResetPasswordController"
            })
        .state('Signup',{
            url: '/Signup',
            templateUrl: '/js/templates_authentication/signUp.html',
            controller: "SignupController"
            });
   $urlRouterProvider.otherwise("/LogIn");
});