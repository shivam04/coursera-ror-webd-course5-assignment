(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['MenuDataService', 'items'];
function ItemsController(MenuDataService, items) {
  var itemsCtrl = this;
  itemsCtrl.category = items.category;
  itemsCtrl.items = items.menu_items;
}

})();
