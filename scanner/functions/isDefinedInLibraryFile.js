function isDefinedInLibraryFile(program, declaration) {
            const sourceFile = declaration.getSourceFile();
            return program.isSourceFileDefaultLibrary(sourceFile) && fileExtensionIs(sourceFile.fileName, ".d.ts" /* Dts */);
        }