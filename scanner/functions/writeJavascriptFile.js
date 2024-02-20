function writeJavascriptFile() {
    // Here we generate a code to enum string LUT

    var categories = [];

    _.keys(enumConfigs).map(category => {
        var categoryObj = {key: category, enums: []};
        categories.push(categoryObj);
        enumConfigs[category].forEach(function(enumKey) {
            if (Array.isArray(enumKey)) {
                // Several keys share the same value, use the first one.
                enumKey = enumKey[0];
            }
            categoryObj.enums.push({ key: enumKey, value: threeEnums[enumKey] });
        }, this);
    }, this);

    var content = jsEnumTemplate({
        now: new Date(),
        generatorScriptName: path.basename(__filename),

        categories: categories
    });

    return fse.outputFile(jsEnumDst, content);
}