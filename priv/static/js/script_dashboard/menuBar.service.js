var myApp = angular.module('common.services');

myApp.factory('menu', ['$location', function ($location) {
    var sections = [{
        name: 'Home',
        state: 'menu.home',
        type: 'link',
        icon: 'home'
    }];
    
    sections.push({
        name: 'Restaurant',
        type: 'toggle',
        icon: 'home',
        pages: [{
            name: 'Restaurant',
            state: 'menu.restaurant.restaurant1',
            type: 'link'
        }]
    });
    
    var self;
    return self = {
        sections: sections,
        toggleSelectSection: function(section) {
            self.openedSection = (self.openedSection === section ? null : section)
        },
        isSectionSelected: function(section) {
            return self.openedSection === section;
        },
        selectPage: function(section, page) {
            page && page.url && $location.path(page.url);
            self.currentSection = section;
            self.currentPage = page;
        }
    }
    function sortByHumanName(a, b) {
          return (a.humanName < b.humanName) ? -1 :
            (a.humanName > b.humanName) ? 1 : 0;
        }
}]);
