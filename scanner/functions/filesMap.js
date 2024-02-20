function filesMap(dir, files) {
    if (!dir) {
        dir = '';
    } else if (dir !== '/') {
        dir = dir + '/';
    }

    let count = 0;

    return coverage.createCoverageMap(
        files.reduce((map, file) => {
            const filePath = dir + file;
            map[filePath] = makeCoverage(filePath, 4, count);
            count += 1;

            return map;
        }, {})
    );
}