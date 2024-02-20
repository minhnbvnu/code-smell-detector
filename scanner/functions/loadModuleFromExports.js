function loadModuleFromExports(scope, extensions, subpath, state, cache, redirectedReference) {
            if (!scope.contents.packageJsonContent.exports) {
                return void 0;
            }
            if (subpath === ".") {
                let mainExport;
                if (typeof scope.contents.packageJsonContent.exports === "string" || Array.isArray(scope.contents.packageJsonContent.exports) || typeof scope.contents.packageJsonContent.exports === "object" && noKeyStartsWithDot(scope.contents.packageJsonContent.exports)) {
                    mainExport = scope.contents.packageJsonContent.exports;
                }
                else if (hasProperty(scope.contents.packageJsonContent.exports, ".")) {
                    mainExport = scope.contents.packageJsonContent.exports["."];
                }
                if (mainExport) {
                    const loadModuleFromTargetImportOrExport = getLoadModuleFromTargetImportOrExport(extensions, state, cache, redirectedReference, subpath, scope, 
                    /*isImports*/
                    false);
                    return loadModuleFromTargetImportOrExport(mainExport, "", 
                    /*pattern*/
                    false, ".");
                }
            }
            else if (allKeysStartWithDot(scope.contents.packageJsonContent.exports)) {
                if (typeof scope.contents.packageJsonContent.exports !== "object") {
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.Export_specifier_0_does_not_exist_in_package_json_scope_at_path_1, subpath, scope.packageDirectory);
                    }
                    return toSearchResult(
                    /*value*/
                    void 0);
                }
                const result = loadModuleFromImportsOrExports(extensions, state, cache, redirectedReference, subpath, scope.contents.packageJsonContent.exports, scope, 
                /*isImports*/
                false);
                if (result) {
                    return result;
                }
            }
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Export_specifier_0_does_not_exist_in_package_json_scope_at_path_1, subpath, scope.packageDirectory);
            }
            return toSearchResult(
            /*value*/
            void 0);
        }