function tryLoadModuleUsingPathsIfEligible(extensions, moduleName, loader, state) {
            var _a2;
            const { baseUrl, paths, configFile } = state.compilerOptions;
            if (paths && !pathIsRelative(moduleName)) {
                if (state.traceEnabled) {
                    if (baseUrl) {
                        trace(state.host, Diagnostics.baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1, baseUrl, moduleName);
                    }
                    trace(state.host, Diagnostics.paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0, moduleName);
                }
                const baseDirectory = getPathsBasePath(state.compilerOptions, state.host);
                const pathPatterns = (configFile == null ? void 0 : configFile.configFileSpecs) ? (_a2 = configFile.configFileSpecs).pathPatterns || (_a2.pathPatterns = tryParsePatterns(paths)) : void 0;
                return tryLoadModuleUsingPaths(extensions, moduleName, baseDirectory, paths, pathPatterns, loader, 
                /*onlyRecordFailures*/
                false, state);
            }
        }