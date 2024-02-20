function serveSettings(request, response) {
    var referrer_url,
        debug = false;

    // Check the referrer for a debug option
    if (request.headers.referer) {
        referrer_url = url.parse(request.headers.referer, true);
        if (referrer_url.query && referrer_url.query.debug) {
            debug = true;
        }
    }

    SettingsGenerator.get(debug, function(err, settings) {
        if (err) {
            winston.error('Error generating settings', err);
            response.writeHead(500, 'Internal Server Error');
            return response.end();
        }

        if (request.headers['if-none-match'] && request.headers['if-none-match'] === settings.hash) {
            response.writeHead(304, 'Not Modified');
            return response.end();
        }

        response.writeHead(200, {
            'ETag': settings.hash,
            'Content-Type': 'application/json'
        });
        response.end(settings.settings);
    });
}