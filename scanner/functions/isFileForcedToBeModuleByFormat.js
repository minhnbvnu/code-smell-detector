function isFileForcedToBeModuleByFormat(file) {
            return (file.impliedNodeFormat === 99 /* ESNext */ || fileExtensionIsOneOf(file.fileName, [".cjs" /* Cjs */, ".cts" /* Cts */, ".mjs" /* Mjs */, ".mts" /* Mts */])) && !file.isDeclarationFile ? true : void 0;
        }