function CssParser (resource /*,importLength*/) {

    var importLength = arguments[1] || 0;


    if (resource instanceof Promise) {
        return resource.then(function (resource) {
            return new CssParser(resource, importLength);
        });
    }


    if (!(resource instanceof Resource.Model)) {
        throw new Error('require `Resource.Model`');
    }


    return new Promise(function (resolve, reject) {

        var file = resource.file;
        var content = resource.content;
        var options = resource.options;
        var cache = options.cache;
        var ast, tasks;


        if (cache) {
            tasks = CssParser.cache[file];
            if (tasks) {
                // 深拷贝缓存
                return resolve(utils.copy(tasks));
            }
        }


        content = getContent(content);

        try {
            ast = CSSOM.parse(content);
        } catch (errors) {
            
            return reject(
                new VError(errors, 'parse "%s" failed', file)
            );
        }


        tasks = new CssParser
        .Parser(ast, file, options, importLength);


        Promise.all(tasks)
        .then(function (tasks) {
            var cssInfo = [];
            tasks.forEach(function (item) {
                if (Array.isArray(item)) {
                    cssInfo = cssInfo.concat(item);
                } else if (item instanceof CssParser.Model) {
                    cssInfo.push(item);
                }
            });


            if (cache) {
                CssParser.cache[file] = cssInfo;
            }


            if (options.debug) {
                console.log('');
                console.log('[DEBUG]', 'CssParser', file);
                console.log(cssInfo);
            }

            resolve(cssInfo);

        })
        .catch(reject);

        
    });
}