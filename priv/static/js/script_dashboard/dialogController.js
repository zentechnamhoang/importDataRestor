function DialogController($scope, $mdDialog, $log, $rootScope, uploadFile, utilFunction, productService) {
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    // dialog upload image
    $scope.uploadImage = function() {
        var fileName = document.getElementById("inputFile").files[0].name;
        var file = utilFunction.dataURItoBlob(this.cropper.croppedImage)
        var promise = uploadFile.uploadFileToUrl(file, '/api/upload/uploadfile', fileName)
        promise.then(
            function (data) {
                if (data.data.result) {
                    $rootScope.uploadedImages.push(data.data.data);
                    $mdDialog.cancel();
                }
                else {
                    //error
                    $mdDialog.cancel();
                }
            },
            function (error) {
                //error
                $mdDialog.cancel();
            }
        )
    }
    
    // dialog price point and option set
    $scope.saveSize = function() {
    }
    $scope.saveOption = function() {
    }
    $scope.moreCurrency = ('USD VND').split(' ').map(function(unit) {return { unit: unit }; });
    
    $scope.addOneMorePricePoint = function() {
        var date = new Date();
        $scope.pricePoints.push({
            'id': Date.parse(date),
            'name': $scope.nameSize,
            'price': $scope.priceSize,
            'currencyUnit': $scope.currencyUnitSize
        })
        $scope.nameSize = "";
        $scope.priceSize = "";
        $scope.currencyUnitSize = "";
    }
    
    $scope.addOneMoreOptionSet = function() {
        var date = new Date();
        $scope.optionSet.push({
            'id': Date.parse(date),
            'name': $scope.nameOption,
            'price': $scope.priceOption,
            'currencyUnit': $scope.currencyUnitOption
        })
        $scope.nameOption = "";
        $scope.priceOption = "";
        $scope.currencyUnitOption = "";
    }
    
    $scope.removeOnePricePoint = function(id) {
        var position = utilFunction.indexOfObject(id, $scope.pricePoints);
        $scope.pricePoints.splice(position, 1);
    }
    
    $scope.removeOneOptionSet = function(id) {
        var position = utilFunction.indexOfObject(id, $scope.optionSet);
        $scope.optionSet.splice(position, 1);
    }
    
    $scope.editOnePricePoint = function(id) {
        var position = utilFunction.indexOfObject(id, $scope.pricePoints);
        $scope.nameSize = $scope.pricePoints[position].name;
        $scope.priceSize = $scope.pricePoints[position].price;
        $scope.currencyUnitSize = $scope.pricePoints[position].currencyUnit;
        $scope.pricePoints.splice(position, 1);
    }
    
    $scope.editOneOptionSet = function(id) {
        var position = utilFunction.indexOfObject(id, $scope.optionSet);
        $scope.nameOption = $scope.optionSet[position].name;
        $scope.priceOption = $scope.optionSet[position].price;
        $scope.currencyUnitOption = $scope.optionSet[position].currencyUnit;
        $scope.optionSet.splice(position, 1);
    }
    
    //data in dialog
    $scope.pricePoints = [{
        'id': 1,
        'name': 'Large',
        'price': '20',
        'currencyUnit': 'USD'
    },
    {
        'id': 2,
        'name': 'Medium',
        'price': '10',
        'currencyUnit': 'USD'
    }]
    $scope.optionSet = [{
        'id': 1,
        'name': 'Onion',
        'price': '2',
        'currencyUnit': 'USD'
    },
    {
        'id': 2,
        'name': 'Pimento',
        'price': '1',
        'currencyUnit': 'USD'
    }]
    
    
    // dialog menu Item
    $scope.saveNewExistedMenuItem = function() {
        var id = productService.getProducts()
        
        for (i = 0; i < $rootScope.data.length; i++){
            for (j = 0; j < $rootScope.data[i].nodes.length; j++) {
                if ($rootScope.data[i].nodes[j].id == id) {
                    for (k = 0; k < $scope.listMenuItemDatabase.length; k++) {
                        if($scope.listMenuItemDatabase[k].selected) {
                            $rootScope.data[i].nodes[j].nodes.push($scope.listMenuItemDatabase[k])
                        }
                    }
                }
            }
        }
        
        $mdDialog.cancel();
    }
    
    $scope.createEmptyMenuItem = function(){
        var id = productService.getProducts()
        var date = new Date();
        for (i = 0; i < $rootScope.data.length; i++){
            for (j = 0; j < $rootScope.data[i].nodes.length; j++) {
                if ($rootScope.data[i].nodes[j].id == id) {
                    $rootScope.data[i].nodes[j].nodes.push({
                        id: Date.parse(date),
                        name: 'item1',
                        status: true,
                        selected: true,
                        images: [],
                        type: 'menuItem'
                    })
                }
            }
        }
        $mdDialog.cancel();
    }
    
    $scope.listMenuItemDatabase = [{
        'id': '456123',
        'name': 'pho',
        'status': true,
        'selected': false,
        'images': [],
        'type': 'menuItem',
    },{
        'id': '456123',
        'name': 'bun bo',
        'status': true,
        'selected': false,
        'images': [],
        'type': 'menuItem',
    },{
        'id': '456123',
        'name': 'mien ga',
        'status': true,
        'selected': false,
        'images': [],
        'type': 'menuItem',
    },{
        'id': '456123',
        'name': 'pho',
        'status': true,
        'selected': false,
        'images': [],
        'type': 'menuItem',
    },{
        'id': '456123',
        'name': 'bun bo',
        'status': true,
        'selected': false,
        'images': [],
        'type': 'menuItem',
    },{
        'id': '456123',
        'name': 'mien ga',
        'status': true,
        'selected': false,
        'images': [],
        'type': 'menuItem',
    },{
        'id': '456123',
        'name': 'pho',
        'status': true,
        'selected': false,
        'images': [],
        'type': 'menuItem',
    },{
        'id': '456123',
        'name': 'bun bo',
        'status': true,
        'selected': false,
        'images': [],
        'type': 'menuItem',
    },{
        'id': '456123',
        'name': 'mien ga',
        'status': true,
        'selected': false,
        'images': [],
        'type': 'menuItem',
    }]
    
    // dialog menu category
    $scope.saveNewExistedMenuCategory = function() {
        var id = productService.getProducts()
        
        for (i = 0; i < $rootScope.data.length; i++){
            if ($rootScope.data[i].id == id) {
                for (k = 0; k < $scope.listMenuCategoryDatabase.length; k++) {
                    if($scope.listMenuCategoryDatabase[k].selected) {
                        $rootScope.data[i].nodes.push($scope.listMenuCategoryDatabase[k])
                    }
                }
            }
        }
        
        $mdDialog.cancel();
    }
    
    $scope.createEmptyMenuCategory = function(){
        var id = productService.getProducts()
        var date = new Date();
        for (i = 0; i < $rootScope.data.length; i++){
            if ($rootScope.data[i].id == id) {
                $rootScope.data[i].nodes.push({
                    id: Date.parse(date),
                    name: 'cate1',
                    status: true,
                    selected: true,
                    images: [],
                    type: 'menuCategory'
                })
            }
        }
        $mdDialog.cancel();
    }
    
    $scope.listMenuCategoryDatabase = [{
        'id': '456123',
        'name': 'pho',
        'status': true,
        'selected': false,
        'images': [],
        'nodes':[],
        'type': 'menuCategory',
    },{
        'id': '456123',
        'name': 'bun bo',
        'status': true,
        'selected': false,
        'images': [],
        'nodes':[],
        'type': 'menuCategory',
    },{
        'id': '456123',
        'name': 'mien ga',
        'status': true,
        'selected': false,
        'images': [],
        'nodes':[],
        'type': 'menuCategory',
    },{
        'id': '456123',
        'name': 'pho',
        'status': true,
        'selected': false,
        'images': [],
        'nodes':[],
        'type': 'menuCategory',
    },{
        'id': '456123',
        'name': 'bun bo',
        'status': true,
        'selected': false,
        'images': [],
        'nodes':[],
        'type': 'menuCategory',
    },{
        'id': '456123',
        'name': 'mien ga',
        'status': true,
        'selected': false,
        'images': [],
        'nodes':[],
        'type': 'menuCategory',
    },{
        'id': '456123',
        'name': 'pho',
        'status': true,
        'selected': false,
        'images': [],
        'nodes':[],
        'type': 'menuCategory',
    },{
        'id': '456123',
        'name': 'bun bo',
        'status': true,
        'selected': false,
        'images': [],
        'nodes':[],
        'type': 'menuCategory',
    },{
        'id': '456123',
        'name': 'mien ga',
        'status': true,
        'selected': false,
        'images': [],
        'nodes':[],
        'type': 'menuCategory',
    }]
    
    //dialog list type of restaurant
    
    $scope.listTypesOfRestaurant = [{type: "Alcohol-free bar", select: false}, {type: "Automat", select: false}, {type: "Automated restaurant", select: false}, {type: "Bakery", select: false}, {type: "Bar", select: false}, {type: "Bar mleczny", select: false}
    , {type: "Bistro", select: false}, {type: "Bouchon", select: false}, {type: "Brasserie", select: false}, {type: "Breastaurant", select: false}, {type: "Brewpub", select: false}, {type: "Bridge restaurant", select: false}, {type: "Café gourmand", select: false}, {type: "Cafeteria", select: false}, {type: "Cakery", select: false}
    , {type: "Cantina", select: false}, {type: "Carvery", select: false}, {type: "Chifa", select: false}, {type: "Chuckwagon", select: false}, {type: "Churrascaria", select: false}, {type: "Coffeehouse", select: false}, {type: "Concession stand", select: false}, {type: "Coney Island (restaurant)", select: false}, {type: "Cosplay restaurant", select: false}
    , {type: "Dai pai dong", select: false}, {type: "Delicatessen", select: false}, {type: "Dhaba", select: false}, {type: "Diner", select: false}, {type: "Dining car", select: false}, {type: "Dining room", select: false}, {type: "Dinner theater", select: false}, {type: "Dinner train", select: false}, {type: "Drive-in", select: false}
    , {type: "Drive-through", select: false}, {type: "Fast food restaurant", select: false}, {type: "Fast casual restaurant", select: false}, {type: "Floating restaurant", select: false}, {type: "Food booth", select: false}, {type: "Food cart", select: false}, {type: "Food court", select: false}, {type: "Food truck", select: false}
    , {type: "Gastropub", select: false}, {type: "Greasy spoon", select: false}, {type: "Haute cuisine", select: false}, {type: "Hawker centre", select: false}, {type: "Health food restaurant", select: false}, {type: "Heuriger", select: false}, {type: "Ice cream parlor", select: false}, {type: "Ice cream van", select: false}
    , {type: "Izakaya", select: false}, {type: "Juke joint", select: false}, {type: "Kafana", select: false}, {type: "Kissaten", select: false}, {type: "Kopi tiam", select: false}, {type: "Lunch counter", select: false}, {type: "Mamak stall", select: false}, {type: "Männergarten", select: false}, {type: "Meadery", select: false}, {type: "Meat and three", select: false}
    , {type: "Microdistillery", select: false}, {type: "Milk bar", select: false}, {type: "Mobile catering", select: false}, {type: "Mystery dinner", select: false}, {type: "Osteria", select: false}, {type: "Ouzeri", select: false}, {type: "Oyster bar", select: false}, {type: "Paladar", select: false}, {type: "Pancake house", select: false}, {type: "Pie and mash", select: false}
    , {type: "Pølsevogn", select: false}, {type: "Pop-up restaurant", select: false}, {type: "Pub", select: false}, {type: "Punjabi dhaba", select: false}, {type: "Raw bar", select: false}, {type: "Refectory", select: false}, {type: "Rejuvenation of dai pai dong", select: false}, {type: "Revolving restaurant", select: false}, {type: "Roadhouse (facility)", select: false}
    , {type: "Rodízio", select: false}, {type: "Sandwich bar", select: false}, {type: "Seafood restaurant", select: false}, {type: "Snack bar", select: false}, {type: "Soda shop", select: false}, {type: "Soup kitchen", select: false}, {type: "Steakhouse", select: false}, {type: "Strausse", select: false}, {type: "Supper club", select: false}, {type: "Take-out", select: false}, {type: "Tavern", select: false}, {type: "Taverna", select: false}
    , {type: "Theme restaurant", select: false}, {type: "Thermopolium", select: false}, {type: "Tower restaurant", select: false}, {type: "Trattoria", select: false}, {type: "Truck stop", select: false}, {type: "Underground restaurant", select: false}, {type: "Volxkuche", select: false}]
    
    $scope.saveTypeOfRestaurant = function () {
        $rootScope.listTypesOfRes = []
        for (i = 0; i < $scope.listTypesOfRestaurant.length; i++) {
            if ($scope.listTypesOfRestaurant[i].select) {
                $rootScope.listTypesOfRes.push($scope.listTypesOfRestaurant[i])
            }
        }
        $mdDialog.cancel();
    }
    
    // Google map 
    
    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 12, control: {}};
    
    $scope.options = {scrollwheel: true};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };
    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
      if (_.isEqual(newVal, oldVal))
        return;
      $scope.coordsUpdates++;
    });
    $scope.confirmAddress = function () {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': $scope.address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $scope.map.center.latitude = $scope.marker.coords.latitude = results[0].geometry.location.lat();
                $scope.map.center.longitude = $scope.marker.coords.longitude = results[0].geometry.location.lng();
                $scope.map.control.refresh($scope.map.center);
            }
        });
    }
    
}
