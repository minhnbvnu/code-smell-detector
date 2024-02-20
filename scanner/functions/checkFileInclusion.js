function checkFileInclusion(path, filename, options) {
        return (
        // verify file has valid extension
        (new RegExp('\\.(' + options.extensions.join('|') + ')$', 'i').test(filename)) &&
            // if options.include is a RegExp, evaluate it and make sure the path passes
            !(options.include && options.include instanceof RegExp && !options.include.test(path)) &&
            // if options.include is a function, evaluate it and make sure the path passes
            !(options.include && typeof options.include === 'function' && !options.include(path, filename)) &&
            // if options.exclude is a RegExp, evaluate it and make sure the path doesn't pass
            !(options.exclude && options.exclude instanceof RegExp && options.exclude.test(path)) &&
            // if options.exclude is a function, evaluate it and make sure the path doesn't pass
            !(options.exclude && typeof options.exclude === 'function' && options.exclude(path, filename)));
    }