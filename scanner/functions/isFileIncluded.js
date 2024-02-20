function isFileIncluded(opts, dir, filename) {

    function isMatch(filter) {
        if (typeof filter === 'function') {
            return filter(filename, dir) === true;
        }
        else {
            // Maintain backwards compatibility and use just the filename
            return filename.match(filter);
        }
    }

    if (opts.include || opts.exclude) {
        if (opts.exclude) {
            if (isMatch(opts.exclude)) {
                return false;
            }
        }

        if (opts.include) {
            if (isMatch(opts.include)) {
                return true;
            }
            else  {
                return false;
            }
        }

        return true;
    }
    else if (opts.filter) {
        var filter = opts.filter;

        if (!opts.whitelist) {
            // if !opts.whitelist is false every file or directory
            // which does match opts.filter will be ignored
            return isMatch(filter) ? false : true;
        } else {
            // if opts.whitelist is true every file or directory
            // which doesn't match opts.filter will be ignored
            return !isMatch(filter) ? false : true;
        }
    }

    return true;
}