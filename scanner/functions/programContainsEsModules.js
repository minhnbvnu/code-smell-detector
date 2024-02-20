function programContainsEsModules(program) {
            return program.getSourceFiles().some((s) => !s.isDeclarationFile && !program.isSourceFileFromExternalLibrary(s) && !!s.externalModuleIndicator);
        }