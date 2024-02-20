function recordList(itemName, records, itemCallback) {
	    var count = records.length;
	    var fields = [];
	    fields[0] = {name: itemName + 'Count', type: 'USHORT', value: count};
	    for (var i = 0; i < count; i++) {
	        fields = fields.concat(itemCallback(records[i], i));
	    }
	    return fields;
	}