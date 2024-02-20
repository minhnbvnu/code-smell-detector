function processEnding(fileName, allowedEndings, options, host) {
            if (fileExtensionIsOneOf(fileName, [".json" /* Json */, ".mjs" /* Mjs */, ".cjs" /* Cjs */])) {
                return fileName;
            }
            const noExtension = removeFileExtension(fileName);
            if (fileName === noExtension) {
                return fileName;
            }
            if (fileExtensionIsOneOf(fileName, [".d.mts" /* Dmts */, ".mts" /* Mts */, ".d.cts" /* Dcts */, ".cts" /* Cts */])) {
                return noExtension + getJSExtensionForFile(fileName, options);
            }
            else if (!fileExtensionIsOneOf(fileName, [".d.ts" /* Dts */]) && fileExtensionIsOneOf(fileName, [".ts" /* Ts */]) && stringContains(fileName, ".d.")) {
                return tryGetRealFileNameForNonJsDeclarationFileName(fileName);
            }
            switch (allowedEndings[0]) {
                case 0 /* Minimal */:
                    const withoutIndex = removeSuffix(noExtension, "/index");
                    if (host && withoutIndex !== noExtension && tryGetAnyFileFromPath(host, withoutIndex)) {
                        return noExtension;
                    }
                    return withoutIndex;
                case 1 /* Index */:
                    return noExtension;
                case 2 /* JsExtension */:
                    return noExtension + getJSExtensionForFile(fileName, options);
                case 3 /* TsExtension */:
                    if (isDeclarationFileName(fileName)) {
                        const extensionlessPriority = allowedEndings.findIndex((e) => e === 0 /* Minimal */ || e === 1 /* Index */);
                        const jsPriority = allowedEndings.indexOf(2 /* JsExtension */);
                        return extensionlessPriority !== -1 && extensionlessPriority < jsPriority ? noExtension : noExtension + getJSExtensionForFile(fileName, options);
                    }
                    return fileName;
                default:
                    return Debug.assertNever(allowedEndings[0]);
            }
        }