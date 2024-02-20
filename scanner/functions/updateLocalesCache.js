function updateLocalesCache() {
    cached_available_locales = [];

    fs.readdir(global.config.public_http + '/assets/locales', function (err, files) {
        if (err) {
            if (err.code === 'ENOENT') {
                winston.error('No locale files could be found at ' + err.path);
            } else {
                winston.error('Error reading locales.', err);
            }
        }

        (files || []).forEach(function (file) {
            if (file.substr(-5) === '.json') {
                cached_available_locales.push(file.slice(0, -5));
            }
        });
    });
}