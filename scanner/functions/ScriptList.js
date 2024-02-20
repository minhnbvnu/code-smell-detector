function ScriptList(scriptListTable) {
	    Table.call(this, 'scriptListTable',
	        recordList('scriptRecord', scriptListTable, function(scriptRecord, i) {
	            var script = scriptRecord.script;
	            var defaultLangSys = script.defaultLangSys;
	            check.assert(!!defaultLangSys, 'Unable to write GSUB: script ' + scriptRecord.tag + ' has no default language system.');
	            return [
	                {name: 'scriptTag' + i, type: 'TAG', value: scriptRecord.tag},
	                {name: 'script' + i, type: 'TABLE', value: new Table('scriptTable', [
	                    {name: 'defaultLangSys', type: 'TABLE', value: new Table('defaultLangSys', [
	                        {name: 'lookupOrder', type: 'USHORT', value: 0},
	                        {name: 'reqFeatureIndex', type: 'USHORT', value: defaultLangSys.reqFeatureIndex}]
	                        .concat(ushortList('featureIndex', defaultLangSys.featureIndexes)))}
	                    ].concat(recordList('langSys', script.langSysRecords, function(langSysRecord, i) {
	                        var langSys = langSysRecord.langSys;
	                        return [
	                            {name: 'langSysTag' + i, type: 'TAG', value: langSysRecord.tag},
	                            {name: 'langSys' + i, type: 'TABLE', value: new Table('langSys', [
	                                {name: 'lookupOrder', type: 'USHORT', value: 0},
	                                {name: 'reqFeatureIndex', type: 'USHORT', value: langSys.reqFeatureIndex}
	                                ].concat(ushortList('featureIndex', langSys.featureIndexes)))}
	                        ];
	                    })))}
	            ];
	        })
	    );
	}