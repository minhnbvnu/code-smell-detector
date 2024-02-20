function loadModuleFromImportsOrExports(extensions, state, cache, redirectedReference, moduleName, lookupTable, scope, isImports) {
            const loadModuleFromTargetImportOrExport = getLoadModuleFromTargetImportOrExport(extensions, state, cache, redirectedReference, moduleName, scope, isImports);
            if (!endsWith(moduleName, directorySeparator) && moduleName.indexOf("*") === -1 && hasProperty(lookupTable, moduleName)) {
                const target = lookupTable[moduleName];
                return loadModuleFromTargetImportOrExport(target, 
                /*subpath*/
                "", 
                /*pattern*/
                false, moduleName);
            }
            const expandingKeys = sort(filter(getOwnKeys(lookupTable), (k) => k.indexOf("*") !== -1 || endsWith(k, "/")), comparePatternKeys);
            for (const potentialTarget of expandingKeys) {
                if (state.features & 16 /* ExportsPatternTrailers */ && matchesPatternWithTrailer(potentialTarget, moduleName)) {
                    const target = lookupTable[potentialTarget];
                    const starPos = potentialTarget.indexOf("*");
                    const subpath = moduleName.substring(potentialTarget.substring(0, starPos).length, moduleName.length - (potentialTarget.length - 1 - starPos));
                    return loadModuleFromTargetImportOrExport(target, subpath, 
                    /*pattern*/
                    true, potentialTarget);
                }
                else if (endsWith(potentialTarget, "*") && startsWith(moduleName, potentialTarget.substring(0, potentialTarget.length - 1))) {
                    const target = lookupTable[potentialTarget];
                    const subpath = moduleName.substring(potentialTarget.length - 1);
                    return loadModuleFromTargetImportOrExport(target, subpath, 
                    /*pattern*/
                    true, potentialTarget);
                }
                else if (startsWith(moduleName, potentialTarget)) {
                    const target = lookupTable[potentialTarget];
                    const subpath = moduleName.substring(potentialTarget.length);
                    return loadModuleFromTargetImportOrExport(target, subpath, 
                    /*pattern*/
                    false, potentialTarget);
                }
            }
            function matchesPatternWithTrailer(target, name) {
                if (endsWith(target, "*"))
                    return false;
                const starPos = target.indexOf("*");
                if (starPos === -1)
                    return false;
                return startsWith(name, target.substring(0, starPos)) && endsWith(name, target.substring(starPos + 1));
            }
        }