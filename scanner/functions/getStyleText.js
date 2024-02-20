function getStyleText(styleObject) {
	    if (!styleObject) {
	        return '';
	    }
	    return Object.keys(styleObject).map(function (name) {
	        var styleName = processStyleName(name);
	        var styleValue = processStyleValue(name, styleObject[name]);
	        return styleName + ':' + styleValue;
	    }).join(';');
	}