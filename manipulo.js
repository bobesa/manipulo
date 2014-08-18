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

	//Removes fields in objects inside of array
	var DEEP_NONE = 0,
		DEEP_ARRAY = 1,
		DEEP_ARRAY_AND_OBJECT = 2,
		_cleanMatch = function(val, params) {
			var found = false;
			//Match
			if(params.fieldsMatch.indexOf(val) > -1) {
				return true;
			}
			
			//Starts with
			params.fieldsStarts.forEach(function(field){
				if(val.indexOf(field) == 0) {
					found = true;
					return;
				}
			});
			if(found) { return true; }
			
			//Ends with
			params.fieldsEnds.forEach(function(field){
				if(val.lastIndexOf(field) == val.length-field.length) {
					found = true;
					return;
				}
			});
			if(found) { return true; }

			//Is inside
			params.fieldsInside.forEach(function(field){
				if(val.indexOf(field) > -1) {
					found = true;
					return;
				}
			});	

			return found;
		},
		_clean = function(obj, params) {
			if(obj instanceof Array && params.deep > DEEP_NONE) {
				obj.map(function(o){
					return _clean(o, params);
				});

			} else if(typeof obj == "object" && obj != null) {
				Object.keys(obj).forEach(function(key){
					if(_cleanMatch(key.toLowerCase(), params)) {
						delete obj[key];
						return;
					}
					if(params.deep == DEEP_ARRAY_AND_OBJECT) {
						obj[key] = _clean(obj[key], params);
					}

				});

			}

			return obj;
		};
	Array.prototype.clear = function(fields, deepness){	
		//Check
		if(typeof fields == "string") {
			fields = [fields];
		} else {
			fields = [];
		}
		if(typeof deepness == "undefined") {
			deepness = DEEP_ARRAY_AND_OBJECT;
		}

		//Categorize	
		var params = {
			fieldsMatch: [],
			fieldsStarts: [],
			fieldsEnds: [],
			fieldsInside: [],
			deep: deepness
		};
		for(var a = 0; a < fields.length; a++) {
			var arg = fields[a];	
			if(typeof arg == "string") {
				arg = arg.toLowerCase();
				if(arg.indexOf("*") == 0 && arg.lastIndexOf("*") == arg.length-1) {
					params.fieldsInside.push(arg.substring(1,arg.length-1));
				} else if(arg.lastIndexOf("*") == arg.length-1) {
					params.fieldsStarts.push(arg.substring(0,arg.length-1));
				} else if(arg.indexOf("*") == 0) {
					params.fieldsEnds.push(arg.substring(1,arg.length));
				} else {
					params.fieldsMatch.push(arg);						
				}
			}			
		}

		//Modify data
		if(params.fieldsMatch.length > 0 || 
			params.fieldsStarts.length > 0 || 
			params.fieldsEnds.length > 0 || 
			params.fieldsInside.length > 0) {
			return _clean(this,params);
		}
		return this;
	};

	//Returns part of array on stated path
	Array.prototype.getByPath = function(path){
		//Check
		if(path == "" || typeof path != "string") {
			return [];
		}

		//Prepare path
		var p, c = this;
		path = path.split(">").reverse();
		while(p = path.pop()) {
			if(c instanceof Array) {
				//Go trough array
				p = Number(p);
				if(isNaN(p) || p >= c.length) {
					return [];
				} else {
					c = c[p];
				}
			} else if(typeof c == "object" && c != null && c.hasOwnProperty(p)) {
				//Go trough object
				c = c[p];

			} else {
				//Cannot continue
				return [];
			}
		}

		//Return place
		return c;
	};



})();
