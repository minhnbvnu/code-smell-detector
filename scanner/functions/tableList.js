function tableList(itemName, records, itemCallback) {
	    var count = records.length;
	    var fields = new Array(count + 1);
	    fields[0] = {name: itemName + 'Count', type: 'USHORT', value: count};
	    for (var i = 0; i < count; i++) {
	        fields[i + 1] = {name: itemName + i, type: 'TABLE', value: itemCallback(records[i], i)};
	    }
	    return fields;
	}