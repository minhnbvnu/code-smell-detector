function SauceBrowser(conf, opt) {
    if (!(this instanceof SauceBrowser)) {
        return new SauceBrowser(conf, opt);
    }

    var self = this;
    self._conf = conf;
    self._opt = opt;
    self._opt.tunnel = (opt.sauce_connect) ? false : (self._opt.tunnel || true);
    self.stats = {
        passed: 0,
        failed: 0
    };
    self.debug = debug('zuul:sauce:' + conf.browser + ':' + conf.version);
    self.debug('browser conf: %j', omit(conf, ['username', 'key']));
}