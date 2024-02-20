function tryLoadModuleUsingRootDirs(extensions, moduleName, containingDirectory, loader, state) {
            if (!state.compilerOptions.rootDirs) {
                return void 0;
            }
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0, moduleName);
            }
            const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
            let matchedRootDir;
            let matchedNormalizedPrefix;
            for (const rootDir of state.compilerOptions.rootDirs) {
                let normalizedRoot = normalizePath(rootDir);
                if (!endsWith(normalizedRoot, directorySeparator)) {
                    normalizedRoot += directorySeparator;
                }
                const isLongestMatchingPrefix = startsWith(candidate, normalizedRoot) && (matchedNormalizedPrefix === void 0 || matchedNormalizedPrefix.length < normalizedRoot.length);
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Checking_if_0_is_the_longest_matching_prefix_for_1_2, normalizedRoot, candidate, isLongestMatchingPrefix);
                }
                if (isLongestMatchingPrefix) {
                    matchedNormalizedPrefix = normalizedRoot;
                    matchedRootDir = rootDir;
                }
            }
            if (matchedNormalizedPrefix) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Longest_matching_prefix_for_0_is_1, candidate, matchedNormalizedPrefix);
                }
                const suffix = candidate.substr(matchedNormalizedPrefix.length);
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, matchedNormalizedPrefix, candidate);
                }
                const resolvedFileName = loader(extensions, candidate, !directoryProbablyExists(containingDirectory, state.host), state);
                if (resolvedFileName) {
                    return resolvedFileName;
                }
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Trying_other_entries_in_rootDirs);
                }
                for (const rootDir of state.compilerOptions.rootDirs) {
                    if (rootDir === matchedRootDir) {
                        continue;
                    }
                    const candidate2 = combinePaths(normalizePath(rootDir), suffix);
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, rootDir, candidate2);
                    }
                    const baseDirectory = getDirectoryPath(candidate2);
                    const resolvedFileName2 = loader(extensions, candidate2, !directoryProbablyExists(baseDirectory, state.host), state);
                    if (resolvedFileName2) {
                        return resolvedFileName2;
                    }
                }
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Module_resolution_using_rootDirs_has_failed);
                }
            }
            return void 0;
        }