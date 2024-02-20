function getDeclarationDiagnostics(host, resolver, file) {
            const compilerOptions = host.getCompilerOptions();
            const result = transformNodes(resolver, host, factory, compilerOptions, file ? [file] : filter(host.getSourceFiles(), isSourceFileNotJson), [transformDeclarations], 
            /*allowDtsFiles*/
            false);
            return result.diagnostics;
        }