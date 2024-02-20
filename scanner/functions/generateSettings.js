function generateSettings(debug) {
    var vars = {
            server_settings: {},
            client_plugins: [],
            translations: [],
            scripts: [
                [
                    'assets/libs/lodash.min.js'
                ],
                ['assets/libs/backbone.min.js', 'assets/libs/jed.js']
            ]
        };

    // Any restricted server mode set?
    if (config.get().restrict_server) {
        vars.server_settings = {
            connection: {
                server: config.get().restrict_server,
                port: config.get().restrict_server_port || 6667,
                ssl: config.get().restrict_server_ssl,
                allow_change: false
            }
        };
    }

    // Any client default settings?
    if (config.get().client) {
        vars.server_settings.client = config.get().client;
    }

    // Client transport specified?
    if (config.get().client_transports) {
        vars.server_settings.transports = config.get().client_transports;
    }

    // Any client plugins?
    if (config.get().client_plugins && config.get().client_plugins.length > 0) {
        vars.client_plugins = config.get().client_plugins;
    }

    addScripts(vars, debug);

    return Promise.all([addThemes().then(function (themes) {
        vars.themes = themes;
    }), addTranslations().then(function (translations) {
        vars.translations = translations;
    })]).then(function () {
        var settings = JSON.stringify(vars);
        return ({
            settings: settings,
            hash: crypto.createHash('md5').update(settings).digest('hex')
        });
    });
}