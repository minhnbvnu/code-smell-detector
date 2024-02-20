function emitBundle(writeFileCallback, customTransformers) {
                var _a2, _b, _c, _d;
                Debug.assert(kind === 1 /* UpdateBundle */);
                if (state.options.dry) {
                    reportStatus(state, Diagnostics.A_non_dry_build_would_update_output_of_project_0, project);
                    buildResult = 1 /* Success */;
                    step = 7 /* QueueReferencingProjects */;
                    return void 0;
                }
                if (state.options.verbose)
                    reportStatus(state, Diagnostics.Updating_output_of_project_0, project);
                const { compilerHost } = state;
                state.projectCompilerOptions = config.options;
                (_b = (_a2 = state.host).beforeEmitBundle) == null ? void 0 : _b.call(_a2, config);
                const outputFiles = emitUsingBuildInfo(config, compilerHost, (ref) => {
                    const refName = resolveProjectName(state, ref.path);
                    return parseConfigFile(state, refName, toResolvedConfigFilePath(state, refName));
                }, customTransformers || ((_d = (_c = state.host).getCustomTransformers) == null ? void 0 : _d.call(_c, project)));
                if (isString(outputFiles)) {
                    reportStatus(state, Diagnostics.Cannot_update_output_of_project_0_because_there_was_error_reading_file_1, project, relName(state, outputFiles));
                    step = 6 /* BuildInvalidatedProjectOfBundle */;
                    return invalidatedProjectOfBundle = createBuildOrUpdateInvalidedProject(0 /* Build */, state, project, projectPath, projectIndex, config, buildOrder);
                }
                Debug.assert(!!outputFiles.length);
                const emitterDiagnostics = createDiagnosticCollection();
                const emittedOutputs = /* @__PURE__ */ new Map();
                let resultFlags = 2 /* DeclarationOutputUnchanged */;
                const existingBuildInfo = state.buildInfoCache.get(projectPath).buildInfo || void 0;
                outputFiles.forEach(({ name, text, writeByteOrderMark, data }) => {
                    var _a3, _b2;
                    emittedOutputs.set(toPath2(state, name), name);
                    if (data == null ? void 0 : data.buildInfo) {
                        if (((_a3 = data.buildInfo.program) == null ? void 0 : _a3.outSignature) !== ((_b2 = existingBuildInfo == null ? void 0 : existingBuildInfo.program) == null ? void 0 : _b2.outSignature)) {
                            resultFlags &= ~2 /* DeclarationOutputUnchanged */;
                        }
                        setBuildInfo(state, data.buildInfo, projectPath, config.options, resultFlags);
                    }
                    writeFile(writeFileCallback ? { writeFile: writeFileCallback } : compilerHost, emitterDiagnostics, name, text, writeByteOrderMark);
                });
                const emitDiagnostics = finishEmit(emitterDiagnostics, emittedOutputs, outputFiles[0].name, resultFlags);
                return { emitSkipped: false, diagnostics: emitDiagnostics };
            }