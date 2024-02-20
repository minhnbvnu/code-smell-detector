function changeConfirmLocale(newLocale) {
	    if (newLocale) {
	        runtimeLocale = (0, _extends3['default'])({}, runtimeLocale, newLocale);
	    } else {
	        runtimeLocale = (0, _extends3['default'])({}, defaultLocale);
	    }
	}