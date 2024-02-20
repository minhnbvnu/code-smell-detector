function loadModuleFromImports(extensions, moduleName, directory, state, cache, redirectedReference) {
            var _a2, _b;
            if (moduleName === "#" || startsWith(moduleName, "#/")) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Invalid_import_specifier_0_has_no_possible_resolutions, moduleName);
                }
                return toSearchResult(
                /*value*/
                void 0);
            }
            const directoryPath = getNormalizedAbsolutePath(combinePaths(directory, "dummy"), (_b = (_a2 = state.host).getCurrentDirectory) == null ? void 0 : _b.call(_a2));
            const scope = getPackageScopeForPath(directoryPath, state);
            if (!scope) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Directory_0_has_no_containing_package_json_scope_Imports_will_not_resolve, directoryPath);
                }
                return toSearchResult(
                /*value*/
                void 0);
            }
            if (!scope.contents.packageJsonContent.imports) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_scope_0_has_no_imports_defined, scope.packageDirectory);
                }
                return toSearchResult(
                /*value*/
                void 0);
            }
            const result = loadModuleFromImportsOrExports(extensions, state, cache, redirectedReference, moduleName, scope.contents.packageJsonContent.imports, scope, 
            /*isImports*/
            true);
            if (result) {
                return result;
            }
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Import_specifier_0_does_not_exist_in_package_json_scope_at_path_1, moduleName, scope.packageDirectory);
            }
            return toSearchResult(
            /*value*/
            void 0);
        }