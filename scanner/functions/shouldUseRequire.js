function shouldUseRequire(sourceFile, program) {
            if (!isSourceFileJS(sourceFile)) {
                return false;
            }
            if (sourceFile.commonJsModuleIndicator && !sourceFile.externalModuleIndicator)
                return true;
            if (sourceFile.externalModuleIndicator && !sourceFile.commonJsModuleIndicator)
                return false;
            const compilerOptions = program.getCompilerOptions();
            if (compilerOptions.configFile) {
                return getEmitModuleKind(compilerOptions) < 5 /* ES2015 */;
            }
            for (const otherFile of program.getSourceFiles()) {
                if (otherFile === sourceFile || !isSourceFileJS(otherFile) || program.isSourceFileFromExternalLibrary(otherFile))
                    continue;
                if (otherFile.commonJsModuleIndicator && !otherFile.externalModuleIndicator)
                    return true;
                if (otherFile.externalModuleIndicator && !otherFile.commonJsModuleIndicator)
                    return false;
            }
            return true;
        }