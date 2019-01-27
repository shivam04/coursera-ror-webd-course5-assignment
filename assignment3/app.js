(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItem.html',
    scope:{
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundItem',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var foundItem = this;

  foundItem.isEmpty = function () {
    return foundItem.items.length === 0;
  };
}
  

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var searchList = this;

  searchList.searchTerm = "";
  searchList.found = [];

  searchList.narrowItDown = function () {
    var promise = MenuSearchService.getMatchedMenuItems(searchList.searchTerm);
    promise.then(function (response){
      searchList.found = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

  searchList.removeItem = function (itemIndex) {
    searchList.found.splice(itemIndex, 1);
  }

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(response){
        var foundItems = [];
        for (var i = 0; i < response.data.menu_items.length; i++) {
          var menuItem = response.data.menu_items[i];
          var menuItemDesc = menuItem.description;
          if(menuItemDesc.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
            foundItems.push(menuItem);
          }
        }
        return foundItems;
    });
  };

}

})();
