function tryLoadModuleUsingPaths(extensions, moduleName, baseDirectory, paths, pathPatterns, loader, onlyRecordFailures, state) {
            pathPatterns || (pathPatterns = tryParsePatterns(paths));
            const matchedPattern = matchPatternOrExact(pathPatterns, moduleName);
            if (matchedPattern) {
                const matchedStar = isString(matchedPattern) ? void 0 : matchedText(matchedPattern, moduleName);
                const matchedPatternText = isString(matchedPattern) ? matchedPattern : patternText(matchedPattern);
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Module_name_0_matched_pattern_1, moduleName, matchedPatternText);
                }
                const resolved = forEach(paths[matchedPatternText], (subst) => {
                    const path = matchedStar ? subst.replace("*", matchedStar) : subst;
                    const candidate = normalizePath(combinePaths(baseDirectory, path));
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.Trying_substitution_0_candidate_module_location_Colon_1, subst, path);
                    }
                    const extension = tryGetExtensionFromPath2(subst);
                    if (extension !== void 0) {
                        const path2 = tryFile(candidate, onlyRecordFailures, state);
                        if (path2 !== void 0) {
                            return noPackageId({ path: path2, ext: extension, resolvedUsingTsExtension: void 0 });
                        }
                    }
                    return loader(extensions, candidate, onlyRecordFailures || !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
                });
                return { value: resolved };
            }
        }