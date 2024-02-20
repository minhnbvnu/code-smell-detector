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