function parseGDEFTable(data, start) {
	    start = start || 0;
	    var p = new Parser(data, start);
	    var tableVersion = p.parseVersion(1);
	    check.argument(tableVersion === 1 || tableVersion === 1.2 || tableVersion === 1.3,
	        'Unsupported GDEF table version.');
	    var gdef = {
	        version: tableVersion,
	        classDef: p.parsePointer(Parser.classDef),
	        attachList: p.parsePointer(attachList),
	        ligCaretList: p.parsePointer(ligCaretList),
	        markAttachClassDef: p.parsePointer(Parser.classDef)
	    };
	    if (tableVersion >= 1.2) {
	        gdef.markGlyphSets = p.parsePointer(markGlyphSets);
	    }
	    return gdef;
	}