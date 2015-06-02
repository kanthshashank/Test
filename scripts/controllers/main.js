angular.module("main")
	.config(["$stateProvider", "links", function ($stateProvider, links) {
        $stateProvider
            .state("Home", {
                url: "/login?link",
                templateUrl: "views/Login.html",
                controller: "login"
            })
            .state("Portal", {
                url: "",
                templateUrl: "views/Main.html",
                controller: "main"
            });
		
		var prefix = "Portal.";
		angular.forEach(links, function (oLink, link) {
			angular.forEach(oLink.links, function (oChildLink, childLink) {
				$stateProvider.state(prefix + link + childLink, {
					url: oChildLink.url.slice(1),
					templateUrl: oChildLink.templateUrl,
					controller: oChildLink.controller
				});
			});
		});
	}])
    .controller("login", ["$scope", "$cookies", "$cookieStore", "$stateParams", function ($scope, $cookies, $cookieStore, $stateParams) {
		$scope.target = $stateParams.link;
		
        $scope.userName = $scope.password = "";
        
        $scope.placeHolder = {
            userName: "Username",
            password: "Password"
        };
        
        $scope.authenticate = function () {
            $cookieStore.put("credentials", {
                userName: $scope.userName,
                password: $scope.password
            });
        };
    }])
    .controller("main", ["$scope", "authentication", "links", function ($scope, authenticationService, links) {
		authenticationService.authenticate();
		
		$scope.applicationStatus = {
			busy: false,
			description: "Loading..."
		};
		
		$scope.links = links;
        
        $scope.setChildLinks = function (oEvent) {
            $scope.selectedLink = this.key;
            $scope.childLinks = $scope.links[this.key].links;
        };
        
        $scope.removeChildLinks = function () {
			$scope.childLinks = null;
		};
    }]);