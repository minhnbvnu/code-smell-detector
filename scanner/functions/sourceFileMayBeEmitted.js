function sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit) {
            const options = host.getCompilerOptions();
            return !(options.noEmitForJsFiles && isSourceFileJS(sourceFile)) && !sourceFile.isDeclarationFile && !host.isSourceFileFromExternalLibrary(sourceFile) && (forceDtsEmit || !(isJsonSourceFile(sourceFile) && host.getResolvedProjectReferenceToRedirect(sourceFile.fileName)) && !host.isSourceOfProjectReferenceRedirect(sourceFile.fileName));
        }