(function(){
  'use strict';
  angular.module('common.services', []);
  angular.module('common.directives', ['common.services']);
  angular.module('menuBar_controller', ['common.directives'])
})();