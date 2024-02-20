function mapPromiseFnOverGlob(globPattern, mapFn, globOptions) {

    return new Promise(function(resolve, reject) {

        let promises = [];
        let result;

        // trailing slash will match only directories
        new Glob(globPattern, globOptions)
            .on('match', function(match) {

                result = mapFn(match);
                if (result instanceof Array) {
                    promises = promises.concat(result);
                } else {
                    promises.push(result);
                }

            })
            .on('end', function() {
                // wait for all file ops to finish
                Promise.all(promises).then(resolve).catch(reject);
            })
            .on('error', function(err) {
                reject(err);
            })
            .on('abort', function() {
                reject(new Error('Aborted'));
            });

    });

}