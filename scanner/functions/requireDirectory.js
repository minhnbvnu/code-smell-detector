function requireDirectory(m, path, options) {
        var retval = {};
        // path is optional
        if (path && !options && typeof path !== 'string') {
            options = path;
            path = null;
        }
        // default options
        options = options || {};
        for (var prop in defaultOptions) {
            if (typeof options[prop] === 'undefined') {
                options[prop] = defaultOptions[prop];
            }
        }
        // if no path was passed in, assume the equivelant of __dirname from caller
        // otherwise, resolve path relative to the equivalent of __dirname
        path = !path ? dirname(m.filename) : resolve(dirname(m.filename), path);
        // get the path of each file in specified directory, append to current tree node, recurse
        fs.readdirSync(path).forEach(function (filename) {
            var joined = join(path, filename), files, key, obj;
            if (fs.statSync(joined).isDirectory() && options.recurse) {
                // this node is a directory; recurse
                files = requireDirectory(m, joined, options);
                // exclude empty directories
                if (Object.keys(files).length) {
                    retval[options.rename(filename, joined, filename)] = files;
                }
            }
            else {
                if (joined !== m.filename && checkFileInclusion(joined, filename, options)) {
                    // hash node key shouldn't include file extension
                    key = filename.substring(0, filename.lastIndexOf('.'));
                    obj = m.require(joined);
                    retval[options.rename(key, joined, filename)] = options.visit(obj, joined, filename) || obj;
                }
            }
        });
        return retval;
    }