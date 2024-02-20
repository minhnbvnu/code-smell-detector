function isDeclarationUsed(identifier) {
                return jsxElementsPresent && (identifier.text === jsxNamespace || jsxFragmentFactory && identifier.text === jsxFragmentFactory) && jsxModeNeedsExplicitImport(compilerOptions.jsx) || ts_FindAllReferences_exports.Core.isSymbolReferencedInFile(identifier, typeChecker, sourceFile);
            }