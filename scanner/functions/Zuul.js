function Zuul(config) {
    if (!(this instanceof Zuul)) {
        return new Zuul(config);
    }

    if (config.browser_retries === undefined) {
        config.browser_retries = 6;
    }

    if (config.browser_output_timeout === undefined) {
        config.browser_output_timeout = -1;
    }

   if (config.browser_open_timeout === undefined) {
       config.browser_open_timeout = 120 * 1000;
   }

    var self = this;

    var ui = config.ui;
    var framework_dir = frameworks[ui];
    if (!framework_dir) {
        throw new Error('unsupported ui: ' + ui);
    }

    config.framework_dir = framework_dir;
    self._config = config;

    debug('config: %j', omit(config, ['sauce_username', 'sauce_key', 'username', 'key']));

    // list of browsers to test
    self._browsers = [];

    self._concurrency = config.concurrency || 5;
}