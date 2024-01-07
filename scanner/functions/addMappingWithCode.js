function addMappingWithCode(mapping, code) {
	    if (mapping === null || mapping.source === undefined) {
	      node.add(code);
	    } else {
	      var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
	      node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
	    }
	  }