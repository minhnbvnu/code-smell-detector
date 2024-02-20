function getCompiler(options) {
    var config = (options.dev) ? webpackConfigDev : webpackConfigProd
    return webpack(_.merge(config, {
        output: {
            path: options.destination,
        },
        resolve: {
            alias: {
                __component__$: options.component,
            },
        },
        resolveLoader: {
            root: path.resolve(__dirname, '../node_modules/'),
        },
    }))
}