function defaultRenderFilteredOption(inputValue, path, prefixCls) {
	    return path.map(function (_ref, index) {
	        var label = _ref.label;

	        var node = label.indexOf(inputValue) > -1 ? highlightKeyword(label, inputValue, prefixCls) : label;
	        return index === 0 ? node : [' / ', node];
	    });
	}