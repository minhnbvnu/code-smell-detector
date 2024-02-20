function createSolutionBuilderState(watch, hostOrHostWithWatch, rootNames, options, baseWatchOptions) {
            const host = hostOrHostWithWatch;
            const hostWithWatch = hostOrHostWithWatch;
            const baseCompilerOptions = getCompilerOptionsOfBuildOptions(options);
            const compilerHost = createCompilerHostFromProgramHost(host, () => state.projectCompilerOptions);
            setGetSourceFileAsHashVersioned(compilerHost);
            compilerHost.getParsedCommandLine = (fileName) => parseConfigFile(state, fileName, toResolvedConfigFilePath(state, fileName));
            compilerHost.resolveModuleNameLiterals = maybeBind(host, host.resolveModuleNameLiterals);
            compilerHost.resolveTypeReferenceDirectiveReferences = maybeBind(host, host.resolveTypeReferenceDirectiveReferences);
            compilerHost.resolveModuleNames = maybeBind(host, host.resolveModuleNames);
            compilerHost.resolveTypeReferenceDirectives = maybeBind(host, host.resolveTypeReferenceDirectives);
            compilerHost.getModuleResolutionCache = maybeBind(host, host.getModuleResolutionCache);
            let moduleResolutionCache, typeReferenceDirectiveResolutionCache;
            if (!compilerHost.resolveModuleNameLiterals && !compilerHost.resolveModuleNames) {
                moduleResolutionCache = createModuleResolutionCache(compilerHost.getCurrentDirectory(), compilerHost.getCanonicalFileName);
                compilerHost.resolveModuleNameLiterals = (moduleNames, containingFile, redirectedReference, options2, containingSourceFile) => loadWithModeAwareCache(moduleNames, containingFile, redirectedReference, options2, containingSourceFile, host, moduleResolutionCache, createModuleResolutionLoader);
                compilerHost.getModuleResolutionCache = () => moduleResolutionCache;
            }
            if (!compilerHost.resolveTypeReferenceDirectiveReferences && !compilerHost.resolveTypeReferenceDirectives) {
                typeReferenceDirectiveResolutionCache = createTypeReferenceDirectiveResolutionCache(compilerHost.getCurrentDirectory(), compilerHost.getCanonicalFileName, 
                /*options*/
                void 0, moduleResolutionCache == null ? void 0 : moduleResolutionCache.getPackageJsonInfoCache());
                compilerHost.resolveTypeReferenceDirectiveReferences = (typeDirectiveNames, containingFile, redirectedReference, options2, containingSourceFile) => loadWithModeAwareCache(typeDirectiveNames, containingFile, redirectedReference, options2, containingSourceFile, host, typeReferenceDirectiveResolutionCache, createTypeReferenceResolutionLoader);
            }
            compilerHost.getBuildInfo = (fileName, configFilePath) => getBuildInfo3(state, fileName, toResolvedConfigFilePath(state, configFilePath), 
            /*modifiedTime*/
            void 0);
            const { watchFile: watchFile2, watchDirectory, writeLog } = createWatchFactory(hostWithWatch, options);
            const state = {
                host,
                hostWithWatch,
                parseConfigFileHost: parseConfigHostFromCompilerHostLike(host),
                write: maybeBind(host, host.trace),
                // State of solution
                options,
                baseCompilerOptions,
                rootNames,
                baseWatchOptions,
                resolvedConfigFilePaths: /* @__PURE__ */ new Map(),
                configFileCache: /* @__PURE__ */ new Map(),
                projectStatus: /* @__PURE__ */ new Map(),
                extendedConfigCache: /* @__PURE__ */ new Map(),
                buildInfoCache: /* @__PURE__ */ new Map(),
                outputTimeStamps: /* @__PURE__ */ new Map(),
                builderPrograms: /* @__PURE__ */ new Map(),
                diagnostics: /* @__PURE__ */ new Map(),
                projectPendingBuild: /* @__PURE__ */ new Map(),
                projectErrorsReported: /* @__PURE__ */ new Map(),
                compilerHost,
                moduleResolutionCache,
                typeReferenceDirectiveResolutionCache,
                // Mutable state
                buildOrder: void 0,
                readFileWithCache: (f) => host.readFile(f),
                projectCompilerOptions: baseCompilerOptions,
                cache: void 0,
                allProjectBuildPending: true,
                needsSummary: true,
                watchAllProjectsPending: watch,
                // Watch state
                watch,
                allWatchedWildcardDirectories: /* @__PURE__ */ new Map(),
                allWatchedInputFiles: /* @__PURE__ */ new Map(),
                allWatchedConfigFiles: /* @__PURE__ */ new Map(),
                allWatchedExtendedConfigFiles: /* @__PURE__ */ new Map(),
                allWatchedPackageJsonFiles: /* @__PURE__ */ new Map(),
                filesWatched: /* @__PURE__ */ new Map(),
                lastCachedPackageJsonLookups: /* @__PURE__ */ new Map(),
                timerToBuildInvalidatedProject: void 0,
                reportFileChangeDetected: false,
                watchFile: watchFile2,
                watchDirectory,
                writeLog
            };
            return state;
        }