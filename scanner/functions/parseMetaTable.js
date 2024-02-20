function parseMetaTable(data, start) {
	    var p = new parse.Parser(data, start);
	    var tableVersion = p.parseULong();
	    check.argument(tableVersion === 1, 'Unsupported META table version.');
	    p.parseULong(); // flags - currently unused and set to 0
	    p.parseULong(); // tableOffset
	    var numDataMaps = p.parseULong();

	    var tags = {};
	    for (var i = 0; i < numDataMaps; i++) {
	        var tag = p.parseTag();
	        var dataOffset = p.parseULong();
	        var dataLength = p.parseULong();
	        var text = decode.UTF8(data, start + dataOffset, dataLength);

	        tags[tag] = text;
	    }
	    return tags;
	}