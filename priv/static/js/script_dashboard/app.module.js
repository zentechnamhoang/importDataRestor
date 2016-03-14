(function(){
  'use strict';
  angular.module('common.services', []);
  angular.module('home.controller', ['dashboard.directive']);
  angular.module('dashboard.directive', [])
  angular.module('dashboard.service', [])
  angular.module('restaurant.controller', ['dashboard.directive', 'dashboard.service'])
  angular.module('menuBar.controller', ['common.directives', 'home.controller', 'restaurant.controller', 'ngMaterial', 'ui.router', 'ui.tree', 'angular-img-cropper', 'ngMessages', 'md.data.table']);
  angular.module('common.directives', ['common.services']);
})();