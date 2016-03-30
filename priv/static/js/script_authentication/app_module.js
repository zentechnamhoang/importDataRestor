(function(){
  'use strict';
  angular.module('authen.service', []);
  angular.module('authen.directive', []);
  angular.module('confirmUnSuccess', ['authen.service', 'authen.directive', 'ngMessages', 'ngMaterial']);
  angular.module('login_controller', ['authen.service', 'authen.directive', 'ngMessages', 'ngMaterial']);
  angular.module('signUp_controller', ['authen.service', 'authen.directive', 'ngMessages', 'ngMaterial']);
  angular.module('resetPassword_controller', ['authen.service', 'authen.directive', 'ngMessages', 'ngMaterial']);
})();