function checkCommonSubstr(clss) {
		var i, len;
		for (i = 0, len = clss.length; i < len; i++) {
			if (-1 === clss[i].indexOf(commonClsSubstr)) {
				console.warn('Class "' + clss[i] + '" was set to be ephemeral,' + 'which hurts peformance.' + ' Add the common substring "' + commonClsSubstr + '" to the class to fix this problem.');
				commonClsSubstr = '';
			}
		}
	}