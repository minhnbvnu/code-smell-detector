function addfolder(pp, name, callback) {
        fs.mkdir(paths.join(pp.osFullPath, name), (err) => {
            if (err) {
                callback(errors(err));
            } else {
                const result = {
                    id: `${pp.relativePath}${name}/`,
                    type: 'folder',
                    attributes: {
                        name,
                        created: pp.stats.birthtime,
                        modified: pp.stats.mtime,
                        path: `${pp.relativePath}${name}/`,
                        readable: 1,
                        writable: 1,
                        timestamp: '',
                    },
                };
        callback(result);
    }// if
    });// fs.mkdir
    }