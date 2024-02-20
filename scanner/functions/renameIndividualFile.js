function renameIndividualFile(loopInfo, files, pp, callback, $index) {
        if (loopInfo.error === false) {
            // const oldfilename = paths.join(__appRoot, files[$index].path);
            const oldfilename = paths.resolve(files[$index].path);
            // new files comes with a directory, replaced files with a filename.  I think there is a better way to handle this
            // but this works as a starting point
            const newfilename = paths.join(
                __appRoot,
                pp.isDirectory ? pp.relativePath : '',
                pp.isDirectory ? files[$index].originalname : pp.filename
            ); // not sure if this is the best way to handle this or not

            fs.rename(oldfilename, newfilename, (err) => {
                if (err) {
                    loopInfo.error = true;
                    console.log('savefiles error -> ', err); // eslint-disable-line no-console
                    callback(errors(err));
                    return;
                }
                const name = paths.parse(newfilename).base;
            const result = {
                id: `${pp.relativePath}${name}`,
                type: 'file',
                attributes: {
                    name,
                    created: pp.stats.birthtime,
                    modified: pp.stats.mtime,
                    path: `${pp.relativePath}${name}`,
                    readable: 1,
                    writable: 1,
                    timestamp: '',
                },
            };
            loopInfo.results.push(result);
            if ($index + 1 >= loopInfo.total) {
                callback(loopInfo.results);
            }
        });// fs.rename
        }// if not loop error
    }