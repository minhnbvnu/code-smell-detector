function getLocaleCode(context) {
	    var localeCode = context.antLocale && context.antLocale.locale;
	    // Had use LocaleProvide but didn't set locale
	    if (context.antLocale && context.antLocale.exist && !localeCode) {
	        return 'zh-cn';
	    }
	    return localeCode;
	}