var myApp = angular.module('dashboard.directive')
myApp.directive('restaurantDirective', function(){
    return {
        templateUrl: "/js/templates_dashboard/restaurant_input_view.html"
    }
});
myApp.directive('menuDirective', function(){
    return {
        templateUrl: "/js/templates_dashboard/menu_input_view.html"
    }
});
myApp.directive('menuCategoryDirective', function(){
    return {
        templateUrl: "/js/templates_dashboard/menuCategory_input_view.html"
    }
});
myApp.directive('menuItemDirective', function(){
    return {
        templateUrl: "/js/templates_dashboard/menuItem_input_view.html"
    }
});
myApp.directive('timezone', function(){
	return{
		rectrict: 'E',
		templateUrl : 'js/templates_dashboard/data-timezone.html'
	}
});
