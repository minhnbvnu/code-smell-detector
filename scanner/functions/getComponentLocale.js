function getComponentLocale(props, context, componentName, getDefaultLocale) {
	    var locale = {};
	    if (context && context.antLocale && context.antLocale[componentName]) {
	        locale = context.antLocale[componentName];
	    } else {
	        var defaultLocale = getDefaultLocale();
	        // TODO: make default lang of antd be English
	        // https://github.com/ant-design/ant-design/issues/6334
	        locale = defaultLocale['default'] || defaultLocale;
	    }
	    var result = (0, _extends3['default'])({}, locale, props.locale);
	    result.lang = (0, _extends3['default'])({}, locale.lang, props.locale.lang);
	    return result;
	}