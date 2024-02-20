function LookupList(lookupListTable, subtableMakers) {
	    Table.call(this, 'lookupListTable', tableList('lookup', lookupListTable, function(lookupTable) {
	        var subtableCallback = subtableMakers[lookupTable.lookupType];
	        check.assert(!!subtableCallback, 'Unable to write GSUB lookup type ' + lookupTable.lookupType + ' tables.');
	        return new Table('lookupTable', [
	            {name: 'lookupType', type: 'USHORT', value: lookupTable.lookupType},
	            {name: 'lookupFlag', type: 'USHORT', value: lookupTable.lookupFlag}
	        ].concat(tableList('subtable', lookupTable.subtables, subtableCallback)));
	    }));
	}