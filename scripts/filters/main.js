angular.module("main")
	.filter("highlight", ["typeaheadHighlightFilter", function(typeaheadHighlightFilter) {
		return function(oInput, query) {
			var pattern = new RegExp(query, "gi"),
				sOutput = [];
			
			angular.forEach(oInput, function (sFieldValue, sFieldName) {
				if(typeof(sFieldValue) === "string" && sFieldValue.match(pattern))
					sOutput.push(sFieldName + ":" + typeaheadHighlightFilter(sFieldValue, query));
			});
			return sOutput.join();
		};
	}]);