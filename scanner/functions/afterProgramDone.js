function afterProgramDone(state, program, config) {
            if (program) {
                if (state.write)
                    listFiles(program, state.write);
                if (state.host.afterProgramEmitAndDiagnostics) {
                    state.host.afterProgramEmitAndDiagnostics(program);
                }
                program.releaseProgram();
            }
            else if (state.host.afterEmitBundle) {
                state.host.afterEmitBundle(config);
            }
            state.projectCompilerOptions = state.baseCompilerOptions;
        }