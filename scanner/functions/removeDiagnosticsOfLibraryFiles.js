function removeDiagnosticsOfLibraryFiles(state) {
            if (!state.cleanedDiagnosticsOfLibFiles) {
                state.cleanedDiagnosticsOfLibFiles = true;
                const program = Debug.checkDefined(state.program);
                const options = program.getCompilerOptions();
                forEach(program.getSourceFiles(), (f) => program.isSourceFileDefaultLibrary(f) && !skipTypeChecking(f, options, program) && removeSemanticDiagnosticsOf(state, f.resolvedPath));
            }
        }