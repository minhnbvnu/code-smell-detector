function getNewImportEntry(moduleSpecifier, importKind, useRequire, addAsTypeOnly) {
                    const typeOnlyKey = newImportsKey(moduleSpecifier, 
                    /*topLevelTypeOnly*/
                    true);
                    const nonTypeOnlyKey = newImportsKey(moduleSpecifier, 
                    /*topLevelTypeOnly*/
                    false);
                    const typeOnlyEntry = newImports.get(typeOnlyKey);
                    const nonTypeOnlyEntry = newImports.get(nonTypeOnlyKey);
                    const newEntry = {
                        defaultImport: void 0,
                        namedImports: void 0,
                        namespaceLikeImport: void 0,
                        useRequire
                    };
                    if (importKind === 1 /* Default */ && addAsTypeOnly === 2 /* Required */) {
                        if (typeOnlyEntry)
                            return typeOnlyEntry;
                        newImports.set(typeOnlyKey, newEntry);
                        return newEntry;
                    }
                    if (addAsTypeOnly === 1 /* Allowed */ && (typeOnlyEntry || nonTypeOnlyEntry)) {
                        return typeOnlyEntry || nonTypeOnlyEntry;
                    }
                    if (nonTypeOnlyEntry) {
                        return nonTypeOnlyEntry;
                    }
                    newImports.set(nonTypeOnlyKey, newEntry);
                    return newEntry;
                }