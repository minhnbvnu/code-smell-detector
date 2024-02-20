function addNewAlias(key, alias) {
                if (!(flags.aliases[key] && flags.aliases[key].length)) {
                    flags.aliases[key] = [alias];
                    newAliases[alias] = true;
                }
                if (!(flags.aliases[alias] && flags.aliases[alias].length)) {
                    addNewAlias(alias, key);
                }
            }