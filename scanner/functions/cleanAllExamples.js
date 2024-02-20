function cleanAllExamples() {
    let examplesDistPathNames = getExamples()
        .map(exampleName => path.join(__dirname, exampleName, 'dist'));

    for (let path of examplesDistPathNames) {
        fs.stat(path, (err, stat) => {
            if (err) {
                return;
            }
            if (stat.isDirectory()) {
                rimraf.sync(path);
            }
        });
    }
}