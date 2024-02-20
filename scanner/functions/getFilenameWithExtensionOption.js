function getFilenameWithExtensionOption(name, compilerOptions, extensionOptions) {
            const nonJsResult = ts_moduleSpecifiers_exports.tryGetRealFileNameForNonJsDeclarationFileName(name);
            if (nonJsResult) {
                return { name: nonJsResult, extension: tryGetExtensionFromPath2(nonJsResult) };
            }
            if (extensionOptions.referenceKind === 0 /* Filename */) {
                return { name, extension: tryGetExtensionFromPath2(name) };
            }
            const endingPreference = getModuleSpecifierEndingPreference(extensionOptions.endingPreference, extensionOptions.resolutionMode, compilerOptions, extensionOptions.importingSourceFile);
            if (endingPreference === 3 /* TsExtension */) {
                if (fileExtensionIsOneOf(name, supportedTSImplementationExtensions)) {
                    return { name, extension: tryGetExtensionFromPath2(name) };
                }
                const outputExtension2 = ts_moduleSpecifiers_exports.tryGetJSExtensionForFile(name, compilerOptions);
                return outputExtension2 ? { name: changeExtension(name, outputExtension2), extension: outputExtension2 } : { name, extension: tryGetExtensionFromPath2(name) };
            }
            if ((endingPreference === 0 /* Minimal */ || endingPreference === 1 /* Index */) && fileExtensionIsOneOf(name, [".js" /* Js */, ".jsx" /* Jsx */, ".ts" /* Ts */, ".tsx" /* Tsx */, ".d.ts" /* Dts */])) {
                return { name: removeFileExtension(name), extension: tryGetExtensionFromPath2(name) };
            }
            const outputExtension = ts_moduleSpecifiers_exports.tryGetJSExtensionForFile(name, compilerOptions);
            return outputExtension ? { name: changeExtension(name, outputExtension), extension: outputExtension } : { name, extension: tryGetExtensionFromPath2(name) };
        }