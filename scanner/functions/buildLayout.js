function buildLayout(options) {
    var data = JSON.parse(fs.readFileSync(options.schema, 'utf8'))
    var validation = Joi.validate(data, schema)
    if (validation.error) return Bluebird.reject(new Bluebird.OperationalError(validation.error))
    var cssPath
    var jsPath
    var markup
    if (options.dev) {
        jsPath = JS_URI
        _.merge(data, {
            server: {
                host: [
                    HOSTNAME,
                    FLATMARKET_SERVER_PORT,
                ].join(':'),
                pathname: '/',
            },
        })
    } else {
        cssPath = CSS_PATHNAME
        jsPath = JS_PATHNAME
        markup = getMarkup(options, data)
    }
    var template = _.template(fs.readFileSync(LAYOUT_PATH, 'utf8'))
    var html = template({
        cssPath: cssPath,
        data: JSON.stringify(data),
        jsPath: jsPath,
        markup: markup,
        title: data.info.name,
    })
    fs.ensureDirSync(options.destination)
    fs.emptyDirSync(options.destination)
    fs.copySync(options.source, options.destination)
    fs.writeFileSync(path.resolve(options.destination, './index.html'), html)
    return Bluebird.resolve()
}