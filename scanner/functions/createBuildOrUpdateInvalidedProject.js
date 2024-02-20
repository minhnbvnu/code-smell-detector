function createBuildOrUpdateInvalidedProject(kind, state, project, projectPath, projectIndex, config, buildOrder) {
            let step = kind === 0 /* Build */ ? 0 /* CreateProgram */ : 4 /* EmitBundle */;
            let program;
            let buildResult;
            let invalidatedProjectOfBundle;
            return kind === 0 /* Build */ ? {
                kind,
                project,
                projectPath,
                buildOrder,
                getCompilerOptions: () => config.options,
                getCurrentDirectory: () => state.compilerHost.getCurrentDirectory(),
                getBuilderProgram: () => withProgramOrUndefined(identity),
                getProgram: () => withProgramOrUndefined((program2) => program2.getProgramOrUndefined()),
                getSourceFile: (fileName) => withProgramOrUndefined((program2) => program2.getSourceFile(fileName)),
                getSourceFiles: () => withProgramOrEmptyArray((program2) => program2.getSourceFiles()),
                getOptionsDiagnostics: (cancellationToken) => withProgramOrEmptyArray((program2) => program2.getOptionsDiagnostics(cancellationToken)),
                getGlobalDiagnostics: (cancellationToken) => withProgramOrEmptyArray((program2) => program2.getGlobalDiagnostics(cancellationToken)),
                getConfigFileParsingDiagnostics: () => withProgramOrEmptyArray((program2) => program2.getConfigFileParsingDiagnostics()),
                getSyntacticDiagnostics: (sourceFile, cancellationToken) => withProgramOrEmptyArray((program2) => program2.getSyntacticDiagnostics(sourceFile, cancellationToken)),
                getAllDependencies: (sourceFile) => withProgramOrEmptyArray((program2) => program2.getAllDependencies(sourceFile)),
                getSemanticDiagnostics: (sourceFile, cancellationToken) => withProgramOrEmptyArray((program2) => program2.getSemanticDiagnostics(sourceFile, cancellationToken)),
                getSemanticDiagnosticsOfNextAffectedFile: (cancellationToken, ignoreSourceFile) => withProgramOrUndefined((program2) => program2.getSemanticDiagnosticsOfNextAffectedFile && program2.getSemanticDiagnosticsOfNextAffectedFile(cancellationToken, ignoreSourceFile)),
                emit: (targetSourceFile, writeFile2, cancellationToken, emitOnlyDtsFiles, customTransformers) => {
                    if (targetSourceFile || emitOnlyDtsFiles) {
                        return withProgramOrUndefined((program2) => {
                            var _a2, _b;
                            return program2.emit(targetSourceFile, writeFile2, cancellationToken, emitOnlyDtsFiles, customTransformers || ((_b = (_a2 = state.host).getCustomTransformers) == null ? void 0 : _b.call(_a2, project)));
                        });
                    }
                    executeSteps(2 /* SemanticDiagnostics */, cancellationToken);
                    if (step === 5 /* EmitBuildInfo */) {
                        return emitBuildInfo(writeFile2, cancellationToken);
                    }
                    if (step !== 3 /* Emit */)
                        return void 0;
                    return emit(writeFile2, cancellationToken, customTransformers);
                },
                done
            } : {
                kind,
                project,
                projectPath,
                buildOrder,
                getCompilerOptions: () => config.options,
                getCurrentDirectory: () => state.compilerHost.getCurrentDirectory(),
                emit: (writeFile2, customTransformers) => {
                    if (step !== 4 /* EmitBundle */)
                        return invalidatedProjectOfBundle;
                    return emitBundle(writeFile2, customTransformers);
                },
                done
            };
            function done(cancellationToken, writeFile2, customTransformers) {
                executeSteps(8 /* Done */, cancellationToken, writeFile2, customTransformers);
                if (kind === 0 /* Build */)
                    mark("SolutionBuilder::Projects built");
                else
                    mark("SolutionBuilder::Bundles updated");
                return doneInvalidatedProject(state, projectPath);
            }
            function withProgramOrUndefined(action) {
                executeSteps(0 /* CreateProgram */);
                return program && action(program);
            }
            function withProgramOrEmptyArray(action) {
                return withProgramOrUndefined(action) || emptyArray;
            }
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
            function handleDiagnostics(diagnostics, errorFlags, errorType) {
                if (diagnostics.length) {
                    ({ buildResult, step } = buildErrors(state, projectPath, program, config, diagnostics, errorFlags, errorType));
                }
                else {
                    step++;
                }
            }
            function getSyntaxDiagnostics(cancellationToken) {
                Debug.assertIsDefined(program);
                handleDiagnostics([
                    ...program.getConfigFileParsingDiagnostics(),
                    ...program.getOptionsDiagnostics(cancellationToken),
                    ...program.getGlobalDiagnostics(cancellationToken),
                    ...program.getSyntacticDiagnostics(
                    /*sourceFile*/
                    void 0, cancellationToken)
                ], 8 /* SyntaxErrors */, "Syntactic");
            }
            function getSemanticDiagnostics(cancellationToken) {
                handleDiagnostics(Debug.checkDefined(program).getSemanticDiagnostics(
                /*sourceFile*/
                void 0, cancellationToken), 16 /* TypeErrors */, "Semantic");
            }
            function emit(writeFileCallback, cancellationToken, customTransformers) {
                var _a2, _b, _c;
                Debug.assertIsDefined(program);
                Debug.assert(step === 3 /* Emit */);
                const saved = program.saveEmitState();
                let declDiagnostics;
                const reportDeclarationDiagnostics = (d) => (declDiagnostics || (declDiagnostics = [])).push(d);
                const outputFiles = [];
                const { emitResult } = emitFilesAndReportErrors(program, reportDeclarationDiagnostics, 
                /*write*/
                void 0, 
                /*reportSummary*/
                void 0, (name, text, writeByteOrderMark, _onError, _sourceFiles, data) => outputFiles.push({ name, text, writeByteOrderMark, data }), cancellationToken, 
                /*emitOnlyDts*/
                false, customTransformers || ((_b = (_a2 = state.host).getCustomTransformers) == null ? void 0 : _b.call(_a2, project)));
                if (declDiagnostics) {
                    program.restoreEmitState(saved);
                    ({ buildResult, step } = buildErrors(state, projectPath, program, config, declDiagnostics, 32 /* DeclarationEmitErrors */, "Declaration file"));
                    return {
                        emitSkipped: true,
                        diagnostics: emitResult.diagnostics
                    };
                }
                const { host, compilerHost } = state;
                const resultFlags = ((_c = program.hasChangedEmitSignature) == null ? void 0 : _c.call(program)) ? 0 /* None */ : 2 /* DeclarationOutputUnchanged */;
                const emitterDiagnostics = createDiagnosticCollection();
                const emittedOutputs = /* @__PURE__ */ new Map();
                const options = program.getCompilerOptions();
                const isIncremental = isIncrementalCompilation(options);
                let outputTimeStampMap;
                let now;
                outputFiles.forEach(({ name, text, writeByteOrderMark, data }) => {
                    const path = toPath2(state, name);
                    emittedOutputs.set(toPath2(state, name), name);
                    if (data == null ? void 0 : data.buildInfo)
                        setBuildInfo(state, data.buildInfo, projectPath, options, resultFlags);
                    const modifiedTime = (data == null ? void 0 : data.differsOnlyInMap) ? getModifiedTime(state.host, name) : void 0;
                    writeFile(writeFileCallback ? { writeFile: writeFileCallback } : compilerHost, emitterDiagnostics, name, text, writeByteOrderMark);
                    if (data == null ? void 0 : data.differsOnlyInMap)
                        state.host.setModifiedTime(name, modifiedTime);
                    else if (!isIncremental && state.watch) {
                        (outputTimeStampMap || (outputTimeStampMap = getOutputTimeStampMap(state, projectPath))).set(path, now || (now = getCurrentTime(state.host)));
                    }
                });
                finishEmit(emitterDiagnostics, emittedOutputs, outputFiles.length ? outputFiles[0].name : getFirstProjectOutput(config, !host.useCaseSensitiveFileNames()), resultFlags);
                return emitResult;
            }
            function emitBuildInfo(writeFileCallback, cancellationToken) {
                Debug.assertIsDefined(program);
                Debug.assert(step === 5 /* EmitBuildInfo */);
                const emitResult = program.emitBuildInfo((name, text, writeByteOrderMark, onError, sourceFiles, data) => {
                    if (data == null ? void 0 : data.buildInfo)
                        setBuildInfo(state, data.buildInfo, projectPath, program.getCompilerOptions(), 2 /* DeclarationOutputUnchanged */);
                    if (writeFileCallback)
                        writeFileCallback(name, text, writeByteOrderMark, onError, sourceFiles, data);
                    else
                        state.compilerHost.writeFile(name, text, writeByteOrderMark, onError, sourceFiles, data);
                }, cancellationToken);
                if (emitResult.diagnostics.length) {
                    reportErrors(state, emitResult.diagnostics);
                    state.diagnostics.set(projectPath, [...state.diagnostics.get(projectPath), ...emitResult.diagnostics]);
                    buildResult = 64 /* EmitErrors */ & buildResult;
                }
                if (emitResult.emittedFiles && state.write) {
                    emitResult.emittedFiles.forEach((name) => listEmittedFile(state, config, name));
                }
                afterProgramDone(state, program, config);
                step = 7 /* QueueReferencingProjects */;
                return emitResult;
            }
            function finishEmit(emitterDiagnostics, emittedOutputs, oldestOutputFileName, resultFlags) {
                const emitDiagnostics = emitterDiagnostics.getDiagnostics();
                if (emitDiagnostics.length) {
                    ({ buildResult, step } = buildErrors(state, projectPath, program, config, emitDiagnostics, 64 /* EmitErrors */, "Emit"));
                    return emitDiagnostics;
                }
                if (state.write) {
                    emittedOutputs.forEach((name) => listEmittedFile(state, config, name));
                }
                updateOutputTimestampsWorker(state, config, projectPath, Diagnostics.Updating_unchanged_output_timestamps_of_project_0, emittedOutputs);
                state.diagnostics.delete(projectPath);
                state.projectStatus.set(projectPath, {
                    type: 1 /* UpToDate */,
                    oldestOutputFileName
                });
                afterProgramDone(state, program, config);
                step = 7 /* QueueReferencingProjects */;
                buildResult = resultFlags;
                return emitDiagnostics;
            }
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
            function executeSteps(till, cancellationToken, writeFile2, customTransformers) {
                while (step <= till && step < 8 /* Done */) {
                    const currentStep = step;
                    switch (step) {
                        case 0 /* CreateProgram */:
                            createProgram2();
                            break;
                        case 1 /* SyntaxDiagnostics */:
                            getSyntaxDiagnostics(cancellationToken);
                            break;
                        case 2 /* SemanticDiagnostics */:
                            getSemanticDiagnostics(cancellationToken);
                            break;
                        case 3 /* Emit */:
                            emit(writeFile2, cancellationToken, customTransformers);
                            break;
                        case 5 /* EmitBuildInfo */:
                            emitBuildInfo(writeFile2, cancellationToken);
                            break;
                        case 4 /* EmitBundle */:
                            emitBundle(writeFile2, customTransformers);
                            break;
                        case 6 /* BuildInvalidatedProjectOfBundle */:
                            Debug.checkDefined(invalidatedProjectOfBundle).done(cancellationToken, writeFile2, customTransformers);
                            step = 8 /* Done */;
                            break;
                        case 7 /* QueueReferencingProjects */:
                            queueReferencingProjects(state, project, projectPath, projectIndex, config, buildOrder, Debug.checkDefined(buildResult));
                            step++;
                            break;
                        case 8 /* Done */:
                        default:
                            assertType(step);
                    }
                    Debug.assert(step > currentStep);
                }
            }
        }