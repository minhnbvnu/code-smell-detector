function createProgram2() {
                var _a2, _b;
                Debug.assert(program === void 0);
                if (state.options.dry) {
                    reportStatus(state, Diagnostics.A_non_dry_build_would_build_project_0, project);
                    buildResult = 1 /* Success */;
                    step = 7 /* QueueReferencingProjects */;
                    return;
                }
                if (state.options.verbose)
                    reportStatus(state, Diagnostics.Building_project_0, project);
                if (config.fileNames.length === 0) {
                    reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                    buildResult = 0 /* None */;
                    step = 7 /* QueueReferencingProjects */;
                    return;
                }
                const { host, compilerHost } = state;
                state.projectCompilerOptions = config.options;
                (_a2 = state.moduleResolutionCache) == null ? void 0 : _a2.update(config.options);
                (_b = state.typeReferenceDirectiveResolutionCache) == null ? void 0 : _b.update(config.options);
                program = host.createProgram(config.fileNames, config.options, compilerHost, getOldProgram(state, projectPath, config), getConfigFileParsingDiagnostics(config), config.projectReferences);
                if (state.watch) {
                    state.lastCachedPackageJsonLookups.set(projectPath, state.moduleResolutionCache && map(state.moduleResolutionCache.getPackageJsonInfoCache().entries(), ([path, data]) => [state.host.realpath && data ? toPath2(state, state.host.realpath(path)) : path, data]));
                    state.builderPrograms.set(projectPath, program);
                }
                step++;
            }