(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
	$scope.dishes = "";
	$scope.messages = "";

	$scope.displayMessage = function(){
		var massageValue = checkIfTooMuch($scope.dishes);
		$scope.messages = massageValue;

	};

	function checkIfTooMuch(string){
		if(string === ""){
			return "Please enter data first";
		}
		var dishArray = string.split(',');
		var cnt = 0;
		for (var i = dishArray.length - 1; i >= 0; i--) {
			var dish = dishArray[i].trim();
			if(dish.length > 0){
				cnt += 1;
			}	
		}
		if(cnt == 0){
			return "Please enter data first";
		}
		if(cnt <= 3){
			return "Enjoy!";
		}
		
		return "Too much!";
	};	
}

})();