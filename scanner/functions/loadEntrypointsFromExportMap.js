function loadEntrypointsFromExportMap(scope, exports, state, extensions) {
            let entrypoints;
            if (isArray(exports)) {
                for (const target of exports) {
                    loadEntrypointsFromTargetExports(target);
                }
            }
            else if (typeof exports === "object" && exports !== null && allKeysStartWithDot(exports)) {
                for (const key in exports) {
                    loadEntrypointsFromTargetExports(exports[key]);
                }
            }
            else {
                loadEntrypointsFromTargetExports(exports);
            }
            return entrypoints;
            function loadEntrypointsFromTargetExports(target) {
                var _a2, _b;
                if (typeof target === "string" && startsWith(target, "./") && target.indexOf("*") === -1) {
                    const partsAfterFirst = getPathComponents(target).slice(2);
                    if (partsAfterFirst.indexOf("..") >= 0 || partsAfterFirst.indexOf(".") >= 0 || partsAfterFirst.indexOf("node_modules") >= 0) {
                        return false;
                    }
                    const resolvedTarget = combinePaths(scope.packageDirectory, target);
                    const finalPath = getNormalizedAbsolutePath(resolvedTarget, (_b = (_a2 = state.host).getCurrentDirectory) == null ? void 0 : _b.call(_a2));
                    const result = loadFileNameFromPackageJsonField(extensions, finalPath, 
                    /*recordOnlyFailures*/
                    false, state);
                    if (result) {
                        entrypoints = appendIfUnique(entrypoints, result, (a, b) => a.path === b.path);
                        return true;
                    }
                }
                else if (Array.isArray(target)) {
                    for (const t of target) {
                        const success = loadEntrypointsFromTargetExports(t);
                        if (success) {
                            return true;
                        }
                    }
                }
                else if (typeof target === "object" && target !== null) {
                    return forEach(getOwnKeys(target), (key) => {
                        if (key === "default" || contains(state.conditions, key) || isApplicableVersionedTypesKey(state.conditions, key)) {
                            loadEntrypointsFromTargetExports(target[key]);
                            return true;
                        }
                    });
                }
            }
        }