function checkUnused() {
    return new Promise(() => {
        var unusedThreeEnums = _.keys(threeEnums);

        _.keys(enumConfigs).map(function(category) {
            const values = enumConfigs[category];
            values.forEach(function(enumKey) {
                if (Array.isArray(enumKey)) {
                    // Several keys share the same value, remove all.
                    enumKey.forEach(function(subKey) {
                        unusedThreeEnums.splice(unusedThreeEnums.indexOf(subKey), 1);
                    });
                } else {
                    unusedThreeEnums.splice(unusedThreeEnums.indexOf(enumKey), 1);
                }
            }, this);
        }, this);

        if (unusedThreeEnums.length > 0) {
            console.error('Unreferenced constants: ', unusedThreeEnums);
        }
    });
}