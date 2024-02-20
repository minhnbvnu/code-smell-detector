function getLocalJsxNamespace(file) {
                if (file.localJsxNamespace) {
                    return file.localJsxNamespace;
                }
                const jsxPragma = file.pragmas.get("jsx");
                if (jsxPragma) {
                    const chosenPragma = isArray(jsxPragma) ? jsxPragma[0] : jsxPragma;
                    file.localJsxFactory = parseIsolatedEntityName(chosenPragma.arguments.factory, languageVersion);
                    visitNode(file.localJsxFactory, markAsSynthetic, isEntityName);
                    if (file.localJsxFactory) {
                        return file.localJsxNamespace = getFirstIdentifier(file.localJsxFactory).escapedText;
                    }
                }
            }