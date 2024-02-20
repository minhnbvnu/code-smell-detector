function getDeclarationEmitExtensionForPath(path) {
            return fileExtensionIsOneOf(path, [".mjs" /* Mjs */, ".mts" /* Mts */]) ? ".d.mts" /* Dmts */ : fileExtensionIsOneOf(path, [".cjs" /* Cjs */, ".cts" /* Cts */]) ? ".d.cts" /* Dcts */ : fileExtensionIsOneOf(path, [".json" /* Json */]) ? `.d.json.ts` : (
            // Drive-by redefinition of json declaration file output name so if it's ever enabled, it behaves well
            ".d.ts" /* Dts */);
        }