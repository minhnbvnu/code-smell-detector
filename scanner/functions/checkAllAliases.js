function checkAllAliases(key, flag) {
                const toCheck = [].concat(flags.aliases[key] || [], key);
                const keys = Object.keys(flag);
                const setAlias = toCheck.find(key => keys.includes(key));
                return setAlias ? flag[setAlias] : false;
            }