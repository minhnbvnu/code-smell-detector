function skipTypeChecking(sourceFile, options, host) {
            return options.skipLibCheck && sourceFile.isDeclarationFile || options.skipDefaultLibCheck && sourceFile.hasNoDefaultLib || host.isSourceOfProjectReferenceRedirect(sourceFile.fileName);
        }