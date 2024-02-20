function normalizeArgs(_schema, options) {
    var PATH_KEYS = [
        'component',
        'destination',
        'schema',
        'source',
    ]
    return _.chain(options)
        .pick([
            'component',
            'destination',
            'dev',
            'preview',
            'source',
            'stripeSecretKey',
        ])
        .extend({
            schema: _schema,
        })
        .mapValues(function (val, key) {
            if (_.isEmpty(val) || !_.contains(PATH_KEYS, key)) return val
            return path.resolve(process.cwd(), val)
        })
        .value()
}