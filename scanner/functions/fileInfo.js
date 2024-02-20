function fileInfo(pp, callback) {
        const result = {
            id: pp.uiPath,
            type: 'file',
            attributes: {
                created: pp.stats.birthtime,
                modified: pp.stats.mtime,
                name: pp.filename,
                path: pp.uiPath,
                readable: 1,
                writable: 1,
                timestamp: '',
            },
        };
        callback(result);
    }