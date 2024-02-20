function combineAliases(aliases) {
        const aliasArrays = [];
        const combined = Object.create(null);
        let change = true;
        Object.keys(aliases).forEach(function (key) {
            aliasArrays.push([].concat(aliases[key], key));
        });
        while (change) {
            change = false;
            for (let i = 0; i < aliasArrays.length; i++) {
                for (let ii = i + 1; ii < aliasArrays.length; ii++) {
                    const intersect = aliasArrays[i].filter(function (v) {
                        return aliasArrays[ii].indexOf(v) !== -1;
                    });
                    if (intersect.length) {
                        aliasArrays[i] = aliasArrays[i].concat(aliasArrays[ii]);
                        aliasArrays.splice(ii, 1);
                        change = true;
                        break;
                    }
                }
            }
        }
        aliasArrays.forEach(function (aliasArray) {
            aliasArray = aliasArray.filter(function (v, i, self) {
                return self.indexOf(v) === i;
            });
            const lastAlias = aliasArray.pop();
            if (lastAlias !== undefined && typeof lastAlias === 'string') {
                combined[lastAlias] = aliasArray;
            }
        });
        return combined;
    }