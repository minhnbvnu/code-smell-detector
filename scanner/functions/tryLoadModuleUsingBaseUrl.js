function tryLoadModuleUsingBaseUrl(extensions, moduleName, loader, state) {
            const { baseUrl } = state.compilerOptions;
            if (!baseUrl) {
                return void 0;
            }
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1, baseUrl, moduleName);
            }
            const candidate = normalizePath(combinePaths(baseUrl, moduleName));
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Resolving_module_name_0_relative_to_base_url_1_2, moduleName, baseUrl, candidate);
            }
            return loader(extensions, candidate, !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
        }