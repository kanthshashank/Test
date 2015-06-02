angular.module("controllers")
	.controller("MachineStatusController", ["$scope", "machineStatusService", "typeaheadHighlightFilter", function ($scope, machineStatusService) {
		console.log("Machine Status");
		
		$scope.applicationStatus.description = "Loading Machine Status...";
		$scope.search = function (searchTerm) {
			$scope.applicationStatus.busy = true;
			
			var oResult;
			
			oResult = machineStatusService.getAll ({
				searchTerm: searchTerm
			}, function(aMachineStatus) {
				$scope.machineStatuses = aMachineStatus;
				$scope.applicationStatus.busy = false;
			});
			
			return oResult.$promise;
		};
		
		$scope.getDate = function(sDate) {
			var timeStamp = new Date(parseInt(sDate.match(/[0-9]+/g)[0]));
			return new Date(parseInt(sDate.match(/[0-9]+/g)[0]));
		};
		
		$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
		
		$scope.formatResultSelected = function(searchTerm) {
			var oSelectedEtry = $scope.searchTerm;
			if(!oSelectedEtry) {
				return "";
			} else {
				var sSearchTerm = [oSelectedEtry.CurrentResponsibleDealer, oSelectedEtry.Pin, oSelectedEtry.Status ].join(" ");
				$scope.search(sSearchTerm);
				return sSearchTerm;
			}
		};
		
		$scope.search();
	}]);