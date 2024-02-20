function writePythonFile() {
    // Here we generate lists of enum keys

    var categories = [];

    _.keys(enumConfigs).map(function(category) {
        var enums = [];
        enumConfigs[category].forEach(function(enumKey) {
            if (Array.isArray(enumKey)) {
                // Several keys share the same value, include all.
                enums = enums.concat(enumKey);
            } else {
                enums.push(enumKey);
            }
        });
        var categoryObj = {key: category, enums: enums};
        categories.push(categoryObj);
    });

    var content = pyEnumTemplate({
        now: new Date(),
        generatorScriptName: path.basename(__filename),

        categories: categories,
    });

    return fse.outputFile(pyEnumDst, content);
}