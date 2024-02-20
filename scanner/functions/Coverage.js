function Coverage(coverageTable) {
	    if (coverageTable.format === 1) {
	        Table.call(this, 'coverageTable',
	            [{name: 'coverageFormat', type: 'USHORT', value: 1}]
	            .concat(ushortList('glyph', coverageTable.glyphs))
	        );
	    } else if (coverageTable.format === 2) {
	        Table.call(this, 'coverageTable',
	            [{name: 'coverageFormat', type: 'USHORT', value: 2}]
	            .concat(recordList('rangeRecord', coverageTable.ranges, function(RangeRecord) {
	                return [
	                    {name: 'startGlyphID', type: 'USHORT', value: RangeRecord.start},
	                    {name: 'endGlyphID', type: 'USHORT', value: RangeRecord.end},
	                    {name: 'startCoverageIndex', type: 'USHORT', value: RangeRecord.index} ];
	            }))
	        );
	    } else {
	        check.assert(false, 'Coverage format must be 1 or 2.');
	    }
	}