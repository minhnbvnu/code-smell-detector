function useProvidedPrograms(programInstances, parseSettings) {
        log('Retrieving ast for %s from provided program instance(s)', parseSettings.filePath);
        let astAndProgram;
        for (const programInstance of programInstances) {
            astAndProgram = (0, shared_1.getAstFromProgram)(programInstance, parseSettings);
            // Stop at the first applicable program instance
            if (astAndProgram) {
                break;
            }
        }
        if (!astAndProgram) {
            const relativeFilePath = path.relative(parseSettings.tsconfigRootDir || process.cwd(), parseSettings.filePath);
            const errorLines = [
                '"parserOptions.programs" has been provided for @typescript-eslint/parser.',
                `The file was not found in any of the provided program instance(s): ${relativeFilePath}`,
            ];
            throw new Error(errorLines.join('\n'));
        }
        astAndProgram.program.getTypeChecker(); // ensure parent pointers are set in source files
        return astAndProgram;
    }