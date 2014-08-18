(function(){	

	//Sorts objects in array by fields
	var SORT_ASC = 0, 
	SORT_DESC = 1,
	SORT_UNKNOWN_VALUE = "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",
	_sortGetValue = function(val,field){
		if(typeof val == "object") {
			if(val == null) {
				return SORT_UNKNOWN_VALUE;
			} else if(typeof field == "undefined") {
				return JSON.stringify(val);
			} else if(val[field] || val.hasOwnProperty(field)) {
				return _sortGetValue(val[field]);
			} else {
				return JSON.stringify(val);				
			}
		} else if(typeof val == "array") {
			return JSON.stringify(val);
		} else if(typeof val == "undefined") {
			return SORT_UNKNOWN_VALUE;
		}

		return val.toString();
	},
	_sort = function(o1,o2,order,field){
		var v1 = _sortGetValue(o1,field), v2 = _sortGetValue(o2,field);
		if(v1 > v2) {
			return order == SORT_ASC ? +1 : -1;
		} else if(v1 < v2) {
			return order == SORT_DESC ? +1 : -1;
		} else {
			return 0;
		}
	};

	Array.prototype.sortBy = function(fields, order){
		//Check
		if(typeof fields == "string") {
			fields = [fields];
		} else {
			fields = [];
		}
		if(typeof order == "undefined") {
			order = SORT_ASC;
		}

		//Actual sorting
		return this.sort(function(a,b) {
			var argId = 0, r = 0;					
			while(argId < fields.length && r == 0) {
				r = _sort(a,b,order,fields[argId]);
				if(r == 0) {
					argId++;
				} else {
					return r;
				}
			}
			return _sort(a,b,order);
		});
	};
})();
