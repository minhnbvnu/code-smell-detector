function startMain(code) {
        if (code !== 0) {
            return console.error('Failed to NPM install');
        }
        var child = spawn('node', [__dirname + "/main.js"], {
            detached: true,
            stdio: 'inherit'
        });
        child.unref();

        process.exit(0);
    }