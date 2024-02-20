function parseCFFFDSelect(data, start, nGlyphs, fdArrayCount) {
	    var fdSelect = [];
	    var fdIndex;
	    var parser = new parse.Parser(data, start);
	    var format = parser.parseCard8();
	    if (format === 0) {
	        // Simple list of nGlyphs elements
	        for (var iGid = 0; iGid < nGlyphs; iGid++) {
	            fdIndex = parser.parseCard8();
	            if (fdIndex >= fdArrayCount) {
	                throw new Error('CFF table CID Font FDSelect has bad FD index value ' + fdIndex + ' (FD count ' + fdArrayCount + ')');
	            }
	            fdSelect.push(fdIndex);
	        }
	    } else if (format === 3) {
	        // Ranges
	        var nRanges = parser.parseCard16();
	        var first = parser.parseCard16();
	        if (first !== 0) {
	            throw new Error('CFF Table CID Font FDSelect format 3 range has bad initial GID ' + first);
	        }
	        var next;
	        for (var iRange = 0; iRange < nRanges; iRange++) {
	            fdIndex = parser.parseCard8();
	            next = parser.parseCard16();
	            if (fdIndex >= fdArrayCount) {
	                throw new Error('CFF table CID Font FDSelect has bad FD index value ' + fdIndex + ' (FD count ' + fdArrayCount + ')');
	            }
	            if (next > nGlyphs) {
	                throw new Error('CFF Table CID Font FDSelect format 3 range has bad GID ' + next);
	            }
	            for (; first < next; first++) {
	                fdSelect.push(fdIndex);
	            }
	            first = next;
	        }
	        if (next !== nGlyphs) {
	            throw new Error('CFF Table CID Font FDSelect format 3 range has bad final GID ' + next);
	        }
	    } else {
	        throw new Error('CFF Table CID Font FDSelect table has unsupported format ' + format);
	    }
	    return fdSelect;
	}