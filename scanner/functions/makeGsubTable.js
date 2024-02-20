function makeGsubTable(gsub) {
	    return new table.Table('GSUB', [
	        {name: 'version', type: 'ULONG', value: 0x10000},
	        {name: 'scripts', type: 'TABLE', value: new table.ScriptList(gsub.scripts)},
	        {name: 'features', type: 'TABLE', value: new table.FeatureList(gsub.features)},
	        {name: 'lookups', type: 'TABLE', value: new table.LookupList(gsub.lookups, subtableMakers)}
	    ]);
	}