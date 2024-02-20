function makeMetaTable(tags) {
	    var numTags = Object.keys(tags).length;
	    var stringPool = '';
	    var stringPoolOffset = 16 + numTags * 12;

	    var result = new table.Table('meta', [
	        {name: 'version', type: 'ULONG', value: 1},
	        {name: 'flags', type: 'ULONG', value: 0},
	        {name: 'offset', type: 'ULONG', value: stringPoolOffset},
	        {name: 'numTags', type: 'ULONG', value: numTags}
	    ]);

	    for (var tag in tags) {
	        var pos = stringPool.length;
	        stringPool += tags[tag];

	        result.fields.push({name: 'tag ' + tag, type: 'TAG', value: tag});
	        result.fields.push({name: 'offset ' + tag, type: 'ULONG', value: stringPoolOffset + pos});
	        result.fields.push({name: 'length ' + tag, type: 'ULONG', value: tags[tag].length});
	    }

	    result.fields.push({name: 'stringPool', type: 'CHARARRAY', value: stringPool});

	    return result;
	}