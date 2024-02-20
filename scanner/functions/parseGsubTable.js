function parseGsubTable(data, start) {
	    start = start || 0;
	    var p = new Parser(data, start);
	    var tableVersion = p.parseVersion(1);
	    check.argument(tableVersion === 1 || tableVersion === 1.1, 'Unsupported GSUB table version.');
	    if (tableVersion === 1) {
	        return {
	            version: tableVersion,
	            scripts: p.parseScriptList(),
	            features: p.parseFeatureList(),
	            lookups: p.parseLookupList(subtableParsers)
	        };
	    } else {
	        return {
	            version: tableVersion,
	            scripts: p.parseScriptList(),
	            features: p.parseFeatureList(),
	            lookups: p.parseLookupList(subtableParsers),
	            variations: p.parseFeatureVariationsList()
	        };
	    }

	}