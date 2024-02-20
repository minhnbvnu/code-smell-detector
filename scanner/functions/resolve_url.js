function resolve_url(href, base) {
        if (url.URL)
            return new url.URL(href, base);
        // older Node version (< v6.13)
        return base ? url.resolve(base, href) : href;
    }