function newImportsKey(moduleSpecifier, topLevelTypeOnly) {
                    return `${topLevelTypeOnly ? 1 : 0}|${moduleSpecifier}`;
                }