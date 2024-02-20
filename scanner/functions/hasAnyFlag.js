function hasAnyFlag(key) {
                const flagsKeys = Object.keys(flags);
                const toCheck = [].concat(flagsKeys.map(k => flags[k]));
                return toCheck.some(function (flag) {
                    return Array.isArray(flag) ? flag.includes(key) : flag[key];
                });
            }