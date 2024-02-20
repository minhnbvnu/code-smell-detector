function getSourceFilesToEmit(host, targetSourceFile, forceDtsEmit) {
            const options = host.getCompilerOptions();
            if (outFile(options)) {
                const moduleKind = getEmitModuleKind(options);
                const moduleEmitEnabled = options.emitDeclarationOnly || moduleKind === 2 /* AMD */ || moduleKind === 4 /* System */;
                return filter(host.getSourceFiles(), (sourceFile) => (moduleEmitEnabled || !isExternalModule(sourceFile)) && sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit));
            }
            else {
                const sourceFiles = targetSourceFile === void 0 ? host.getSourceFiles() : [targetSourceFile];
                return filter(sourceFiles, (sourceFile) => sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit));
            }
        }