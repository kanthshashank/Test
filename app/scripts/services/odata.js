angular.module("odata", ["ngResource"])
	.factory("resourceFactory", ["$resource", "$q", function ($resource, $q) {
		var pathPrefix = "/sap/opu/odata/sap";
		
		return {
			createResource: function(path) {
				var oResource = $resource(pathPrefix + path, {
					$format: "json"
				}, {
					getAll: {
						url: pathPrefix + path + "?openSearch=:searchTerm",
						method: "GET",
						interceptor: {
							response: function(response) {
								return response.data.d.results;
							}
						}
					}
				});
				
				return oResource;
			}
		};
	}])
	.factory("machineStatusService", ["resourceFactory", function (resourceFactory) {
		return resourceFactory.createResource("/ZWY_SV_GW_CL_TCSM_MACH_SRV/MachineStatusCollection");
	}]);