function isRenderResultPlainObject(result) {
	    return result && !_react2['default'].isValidElement(result) && Object.prototype.toString.call(result) === '[object Object]';
	}