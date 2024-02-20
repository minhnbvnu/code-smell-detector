function highlightKeyword(str, keyword, prefixCls) {
	    return str.split(keyword).map(function (node, index) {
	        return index === 0 ? node : [_react2['default'].createElement(
	            'span',
	            { className: prefixCls + '-menu-item-keyword', key: 'seperator' },
	            keyword
	        ), node];
	    });
	}