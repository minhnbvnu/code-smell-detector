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