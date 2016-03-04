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
            state: 'menu.restaurant.restaurant',
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
myApp.service('settingTreeView', function() {
    this.remove = function (scope) {
        scope.remove;
    };
    this.toggle = function (scope) {
        scope.toggle();
    };
    this.moveLastToTheBeginning = function () {
        // variable a is nodes
        var a = this.data.pop();
        this.data.splice(0, 0, a);
    }
    this.newSubItem =function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
    }
    this.colapseAll = function () {
        this.$broadcast('angular-ui-tree:collapse-all');
    }
    this.expandAll = function () {
        this.$broadcast('angular-ui-tree:expand-all');
    };
})