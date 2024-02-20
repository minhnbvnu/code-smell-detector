function loadInternal(path, prefix, logEmitter, config, tables, connectors) {
    assert.ok(path, 'path should not be null');
    assert.ok(config, 'config should not be null');
    assert.ok(tables, 'tables should not be null');

    var script, name, stats, paths;
    path = path.charAt(path.length - 1) == '/' ? path : path + '/';
    try {
        paths = fs.readdirSync(path);
    }
    catch(e) {
        logEmitter.emitError('Unable to load tables from ' + path);
        return;
    }

    paths.forEach(function(filename) {
        stats = fs.statSync(path + filename);
        if(stats.isDirectory()) {
            loadInternal(path + filename,
                prefix.length > 0 ? prefix + '.' + filename : filename,
                logEmitter, config, tables, connectors);
        }
        else if(stats.isFile() && /\.ql$/.test(filename)) {
            // Load script files from the disk
            script = fs.readFileSync(path + filename, 'utf8');

            name = filename.substring(0, filename.lastIndexOf('.'));

            // Get the semantic model
            brew.go({
                path: path,
                name: name,
                config: config,
                script: script,
                logEmitter: logEmitter,
                connectors: connectors,
                cb: function(err, table) {
                    if(err) {
                        logEmitter.emitError(err);
                    }
                    else {
                        assert.ok(table, 'table should not be null');
                        tables[table.name] = table;
                    }
                }
            });
        }
    });
}