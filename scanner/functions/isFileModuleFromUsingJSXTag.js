function isFileModuleFromUsingJSXTag(file) {
            return !file.isDeclarationFile ? walkTreeForJSXTags(file) : void 0;
        }