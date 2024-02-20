function getProgramAndAST(parseSettings, shouldProvideParserServices) {
        return ((parseSettings.programs &&
            (0, useProvidedPrograms_1.useProvidedPrograms)(parseSettings.programs, parseSettings)) ||
            (shouldProvideParserServices && (0, createProjectProgram_1.createProjectProgram)(parseSettings)) ||
            (shouldProvideParserServices &&
                parseSettings.createDefaultProgram &&
                (0, createDefaultProgram_1.createDefaultProgram)(parseSettings)) ||
            (0, createIsolatedProgram_1.createIsolatedProgram)(parseSettings));
    }