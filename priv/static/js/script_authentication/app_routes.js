var myApp = angular.module('ZentechRestor', ['login_controller', 'signUp_controller', 'resetPassword_controller', 'confirmUnSuccess', 'ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider){
   $stateProvider
        .state('ConfirmUnSuccess',{
            url: '/ConfirmUnSuccess',
            templateUrl: '/js/templates_authentication/confirmUnSuccess.html',
            controller: "confirmUnSuccessController"
            })
        .state('ConfirmSuccess',{
            url: '/ConfirmSuccess',
            templateUrl: '/js/templates_authentication/confirmSuccess.html'
            })
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