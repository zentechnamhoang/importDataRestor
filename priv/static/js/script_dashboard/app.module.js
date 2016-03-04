(function(){
  'use strict';
  angular.module('common.services', []);
  angular.module('home.controller', []);
  angular.module('menuBar.controller', ['common.directives', 'home.controller', 'ngMaterial', 'ui.router', 'ui.tree']);
  angular.module('common.directives', ['common.services']);
})();