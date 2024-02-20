function serveMagicLocale(request, response) {
    var default_locale_id = 'en-gb',
        found_locale, negotiator;

    if (!request.headers['accept-language']) {
        // No accept-language specified in the request so send the default
        found_locale = default_locale_id;

    } else {
        negotiator = new Negotiator(request);
        found_locale = negotiator.language(cached_available_locales);

        // If a locale couldn't be negotiated, use the default
        found_locale = found_locale || default_locale_id;
    }

    // Send a locale to the browser
    this.file_server.serveFile('/assets/locales/' + found_locale + '.json', 200, {
        Vary: 'Accept-Language',
        'Content-Language': found_locale
    }, request, response);
}