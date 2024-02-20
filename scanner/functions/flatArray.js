function flatArray() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var childrenName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';

	    var result = [];
	    var loop = function loop(array) {
	        array.forEach(function (item) {
	            if (item[childrenName]) {
	                var newItem = (0, _extends3['default'])({}, item);
	                delete newItem[childrenName];
	                result.push(newItem);
	                if (item[childrenName].length > 0) {
	                    loop(item[childrenName]);
	                }
	            } else {
	                result.push(item);
	            }
	        });
	    };
	    loop(data);
	    return result;
	}