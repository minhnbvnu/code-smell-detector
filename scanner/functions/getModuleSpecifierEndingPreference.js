function getModuleSpecifierEndingPreference(preference, resolutionMode, compilerOptions, sourceFile) {
            if (preference === "js" || resolutionMode === 99 /* ESNext */) {
                if (!shouldAllowImportingTsExtension(compilerOptions)) {
                    return 2 /* JsExtension */;
                }
                return inferPreference() !== 2 /* JsExtension */ ? 3 /* TsExtension */ : 2 /* JsExtension */;
            }
            if (preference === "minimal") {
                return 0 /* Minimal */;
            }
            if (preference === "index") {
                return 1 /* Index */;
            }
            if (!shouldAllowImportingTsExtension(compilerOptions)) {
                return usesExtensionsOnImports(sourceFile) ? 2 /* JsExtension */ : 0 /* Minimal */;
            }
            return inferPreference();
            function inferPreference() {
                let usesJsExtensions = false;
                const specifiers = sourceFile.imports.length ? sourceFile.imports.map((i) => i.text) : isSourceFileJS(sourceFile) ? getRequiresAtTopOfFile(sourceFile).map((r) => r.arguments[0].text) : emptyArray;
                for (const specifier of specifiers) {
                    if (pathIsRelative(specifier)) {
                        if (hasTSFileExtension(specifier)) {
                            return 3 /* TsExtension */;
                        }
                        if (hasJSFileExtension(specifier)) {
                            usesJsExtensions = true;
                        }
                    }
                }
                return usesJsExtensions ? 2 /* JsExtension */ : 0 /* Minimal */;
            }
        }