function makeGposTable(gpos) {
	    return new table.Table('GPOS', [
	        {name: 'version', type: 'ULONG', value: 0x10000},
	        {name: 'scripts', type: 'TABLE', value: new table.ScriptList(gpos.scripts)},
	        {name: 'features', type: 'TABLE', value: new table.FeatureList(gpos.features)},
	        {name: 'lookups', type: 'TABLE', value: new table.LookupList(gpos.lookups, subtableMakers$1)}
	    ]);
	}