function ushortList(itemName, list, count) {
	    if (count === undefined) {
	        count = list.length;
	    }
	    var fields = new Array(list.length + 1);
	    fields[0] = {name: itemName + 'Count', type: 'USHORT', value: count};
	    for (var i = 0; i < list.length; i++) {
	        fields[i + 1] = {name: itemName + i, type: 'USHORT', value: list[i]};
	    }
	    return fields;
	}