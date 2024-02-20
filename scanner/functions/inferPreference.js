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