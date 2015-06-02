angular.module("main",  ["ui.router", "controllers", "ngCookies", "ngResource", "ui.bootstrap"])
    .constant("links", {
        "ProductTracking": {
			description: "Product Tracking",
            links: {
                "ProductInformation":  {
					description:	"Product Information",
					templateUrl:	"views/Product.html",
					url:			"#/ProductTracking/ProductInformation",
					controller:		"ProductInformationController"
				},
				"RegisterProduct": {
					description:	"Register Product",
					templateUrl: 	"views/RegisterProduct.html",
					url:			"#/ProductTracking/RegisterProduct",
					controller: 	"RegisterProductController"
				}
			}
		},
        "TCSM": {
		   	description: "TCSM",
            links: {
				"MachineStatus": {
		   			description:	"Machine Status",
					templateUrl:	"views/MachineStatus.html",
		   			url:			"#/TCSM/MachineStatus",
					controller:		"MachineStatusController"
		   		},
                "LaborRate": {
		   			description:	"Labor Rate",
					templateUrl:	"views/LaborRate.html",
		   			url:			"#/TCSM/LaborRate",
					controller:		"LaborRateController"
		   		}
            }
        }
    })
	.config(["$httpProvider", "authenticationProvider", function ($httpProvider, authenticationProvider) {
		$httpProvider.interceptors.push(["$q", function($q) {
			return {
				request: function(config) {
					if(config.url.indexOf("/sap/opu/odata/sap") != 0)
						return config;
					
					var oDeferred = authenticationProvider.promise.then(function () {
						return config;
					});
					return oDeferred;
				}
			};
		}]);
	}])
	.provider("authentication", [function authenticationProvider() {
		var oDeferred = $.Deferred();
		this.promise = oDeferred.promise();
		
		function AuthenticationService($cookies, $cookieStore, $state, $location, $window, $q) {
			this.authenticate = function () {
				if ($cookies.credentials || $cookies.SAP_SESSIONID_CG1_210) {			
					var oCredentials = $cookieStore.get("credentials"),
						oFormData = new FormData(),
						oRequest = new XMLHttpRequest();

					if (oCredentials) {
						oFormData.append("sap-user", oCredentials.userName);
						oFormData.append("sap-password", oCredentials.password);
						$cookieStore.remove("credentials");

						oRequest.open("POST", "/sap/opu/odata");
						oRequest.send(oFormData);

						oRequest.onreadystatechange = function () {
							if (oRequest.readyState === 4)
								$window.location.reload();
						};
					}

					if($cookies.SAP_SESSIONID_CG1_210)
						oDeferred.resolve();
				} else {
					$state.go("Home", { link: $location.absUrl() });
				}
			};
		};
		
		this.$get = ["$cookies", "$cookieStore", "$state", "$location", "$window", "$q", function ($cookies, $cookieStore, $state, $location, $window, $q) {
			return new AuthenticationService($cookies, $cookieStore, $state, $location, $window, $q);
		}];
	}]);