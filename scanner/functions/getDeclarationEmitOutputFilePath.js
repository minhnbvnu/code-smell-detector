function getDeclarationEmitOutputFilePath(fileName, host) {
            return getDeclarationEmitOutputFilePathWorker(fileName, host.getCompilerOptions(), host.getCurrentDirectory(), host.getCommonSourceDirectory(), (f) => host.getCanonicalFileName(f));
        }