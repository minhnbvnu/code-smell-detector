function shouldProgramCreateNewSourceFiles(program, newOptions) {
            if (!program)
                return false;
            return optionsHaveChanges(program.getCompilerOptions(), newOptions, sourceFileAffectingCompilerOptions);
        }