function getJsxFragmentFactoryEntity(location) {
                if (location) {
                    const file = getSourceFileOfNode(location);
                    if (file) {
                        if (file.localJsxFragmentFactory) {
                            return file.localJsxFragmentFactory;
                        }
                        const jsxFragPragmas = file.pragmas.get("jsxfrag");
                        const jsxFragPragma = isArray(jsxFragPragmas) ? jsxFragPragmas[0] : jsxFragPragmas;
                        if (jsxFragPragma) {
                            file.localJsxFragmentFactory = parseIsolatedEntityName(jsxFragPragma.arguments.factory, languageVersion);
                            return file.localJsxFragmentFactory;
                        }
                    }
                }
                if (compilerOptions.jsxFragmentFactory) {
                    return parseIsolatedEntityName(compilerOptions.jsxFragmentFactory, languageVersion);
                }
            }