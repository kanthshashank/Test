angular.module("controllers")
	.controller("RegisterProductController", ["$scope", "Pin", function ($scope, pin) {
        $scope.sayHello = function () {
            jQuery.get("/?q=test", function () {
                console.log(arguments);
            });
        };
            
        console.log("Register Product");
    }]);