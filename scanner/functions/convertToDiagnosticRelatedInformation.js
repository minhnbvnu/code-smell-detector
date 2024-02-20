function convertToDiagnosticRelatedInformation(diagnostic, newProgram, toPath3) {
            const { file } = diagnostic;
            return {
                ...diagnostic,
                file: file ? newProgram.getSourceFileByPath(toPath3(file)) : void 0
            };
        }