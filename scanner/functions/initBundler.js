function initBundler(files, config) {
    var opt = {
        debug: true,
        basedir: config.prj_dir
    };

    // watchify options
    // https://github.com/substack/watchify#var-w--watchifyb-opts
    opt = _.assign(opt, {
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    var userConfig = _.find(config.browserify, 'options');
    var browserifyOptions = _.assign({}, opt);

    if (userConfig) {
        browserifyOptions = _.assign(browserifyOptions, userConfig.options || {});
    }

    var bundler = browserify(browserifyOptions);

    debug('configuring browserify with provided options: %j', config.browserify);
    configure(bundler, config.browserify);

    if (config.coverage && config.instrument && config.local) {
        debug('using istanbul transform');
        bundler.transform(istanbul({
            defaultIgnore: true
        }));
    }

    debug('adding to bundle: %j', files);
    files.forEach(function(file) {
        bundler.require(file, { entry: true });
    });

    bundler = watchify(bundler);

    return bundler;
}