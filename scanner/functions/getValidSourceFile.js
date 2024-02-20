function getValidSourceFile(fileName) {
                const sourceFile = program.getSourceFile(fileName);
                if (!sourceFile) {
                    const error = new Error(`Could not find source file: '${fileName}'.`);
                    error.ProgramFiles = program.getSourceFiles().map((f) => f.fileName);
                    throw error;
                }
                return sourceFile;
            }