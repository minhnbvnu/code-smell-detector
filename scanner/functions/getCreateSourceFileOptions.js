function getCreateSourceFileOptions(fileName, moduleResolutionCache2, host2, options2) {
                const result = getImpliedNodeFormatForFileWorker(getNormalizedAbsolutePath(fileName, currentDirectory), moduleResolutionCache2 == null ? void 0 : moduleResolutionCache2.getPackageJsonInfoCache(), host2, options2);
                const languageVersion = getEmitScriptTarget(options2);
                const setExternalModuleIndicator2 = getSetExternalModuleIndicator(options2);
                return typeof result === "object" ? { ...result, languageVersion, setExternalModuleIndicator: setExternalModuleIndicator2 } : { languageVersion, impliedNodeFormat: result, setExternalModuleIndicator: setExternalModuleIndicator2 };
            }