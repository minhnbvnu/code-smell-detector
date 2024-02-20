function injectQsComponent(url, component) {
        // inject it after the querystring but before the fragment
        return url.replace(/(\?.*?)?(#|$)/, function (whole, qs, hash) {
            return (qs ? qs + '&' : '?') + component + hash;
        });
    }