function isCheckJsEnabledForFile(sourceFile, compilerOptions) {
            return sourceFile.checkJsDirective ? sourceFile.checkJsDirective.enabled : compilerOptions.checkJs;
        }