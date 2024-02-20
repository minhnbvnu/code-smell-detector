function buildErrors(state, resolvedPath, program, config, diagnostics, buildResult, errorType) {
            const canEmitBuildInfo = program && !outFile(program.getCompilerOptions());
            reportAndStoreErrors(state, resolvedPath, diagnostics);
            state.projectStatus.set(resolvedPath, { type: 0 /* Unbuildable */, reason: `${errorType} errors` });
            if (canEmitBuildInfo)
                return { buildResult, step: 5 /* EmitBuildInfo */ };
            afterProgramDone(state, program, config);
            return { buildResult, step: 7 /* QueueReferencingProjects */ };
        }