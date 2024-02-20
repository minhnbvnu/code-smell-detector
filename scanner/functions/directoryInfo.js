function directoryInfo(pp, callback) {
        const result = {
            id: pp.uiPath.replace(/([\s\S^/])\/?$/, '$1/'),
            type: 'folder',
            attributes: {
                created: pp.stats.birthtime,
                modified: pp.stats.mtime,
                name: pp.filename,
                path: pp.uiPath.replace(/([\s\S^/])\/?$/, '$1/'),
                readable: 1,
                writable: 1,
                timestamp: '',
            },
        };
        callback(result);
    }