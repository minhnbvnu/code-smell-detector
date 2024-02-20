function createSheetProxy (sheet) {
		return {
			cssRules: function () {
				return sheet.cssRules || sheet.rules;
			},
			insertRule: sheet.insertRule || function (text, index) {
				var parts = text.split(/\{|\}/g);
				sheet.addRule(parts[0], parts[1], index);
				return index;
			},
			deleteRule: sheet.deleteRule || function (index) {
				sheet.removeRule(index);
				return index;
			},
			sheet: function () {
				return sheet;
			}
		};
	}