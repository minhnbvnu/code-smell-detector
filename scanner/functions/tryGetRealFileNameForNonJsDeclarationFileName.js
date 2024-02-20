function tryGetRealFileNameForNonJsDeclarationFileName(fileName) {
            const baseName = getBaseFileName(fileName);
            if (!endsWith(fileName, ".ts" /* Ts */) || !stringContains(baseName, ".d.") || fileExtensionIsOneOf(baseName, [".d.ts" /* Dts */]))
                return void 0;
            const noExtension = removeExtension(fileName, ".ts" /* Ts */);
            const ext = noExtension.substring(noExtension.lastIndexOf("."));
            return noExtension.substring(0, noExtension.indexOf(".d.")) + ext;
        }