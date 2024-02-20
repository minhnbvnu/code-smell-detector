async function registerServer() {
        sinon.stub(fs, 'existsSync').returns(false);

        /* eslint-disable global-require */
        const plugin = require('../../plugins/versions');
        /* eslint-enable global-require */

        const server = new hapi.Server({
            port: 1234
        });

        await server.register({ plugin });

        return server;
    }