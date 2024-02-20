function y18n$1(opts, _shim) {
        shim = _shim;
        const y18n = new Y18N(opts);
        return {
            __: y18n.__.bind(y18n),
            __n: y18n.__n.bind(y18n),
            setLocale: y18n.setLocale.bind(y18n),
            getLocale: y18n.getLocale.bind(y18n),
            updateLocale: y18n.updateLocale.bind(y18n),
            locale: y18n.locale
        };
    }