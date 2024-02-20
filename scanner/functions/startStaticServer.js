function startStaticServer(options) {
    var server = new Hapi.Server()
    server.connection({
        port: STATIC_SERVER_PORT,
        tls: {
            ca: fs.readFileSync(path.resolve(__dirname, '../ssl/ca.crt')),
            cert: fs.readFileSync(path.resolve(__dirname, '../ssl/server.crt')),
            key: fs.readFileSync(path.resolve(__dirname, '../ssl/server.key')),
            rejectUnauthorized: false,
            requestCert: true,
        },
    })
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: options.destination,
            },
        },
    })
    return new Bluebird(function (resolve, reject) {
        server.start(function (err) {
            if (err) return reject(err)
            return resolve()
        })
    })
}