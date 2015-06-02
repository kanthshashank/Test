angular.module("controllers")
	.controller("ProductInformationController", ["$scope", "Pin", function ($scope, pin) {
		console.log("Product Information");
		$scope.pin = pin.sample;
	}]);