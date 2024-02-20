function isPlainJsFile(file, checkJs) {
            return !!file && (file.scriptKind === 1 /* JS */ || file.scriptKind === 2 /* JSX */) && !file.checkJsDirective && checkJs === void 0;
        }