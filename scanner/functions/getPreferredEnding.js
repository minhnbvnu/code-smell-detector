function getPreferredEnding() {
                if (oldImportSpecifier !== void 0) {
                    if (hasJSFileExtension(oldImportSpecifier))
                        return 2 /* JsExtension */;
                    if (endsWith(oldImportSpecifier, "/index"))
                        return 1 /* Index */;
                }
                return getModuleSpecifierEndingPreference(importModuleSpecifierEnding, importingSourceFile.impliedNodeFormat, compilerOptions, importingSourceFile);
            }