function tryUseExistingNamespaceImport(existingImports, position) {
            return firstDefined(existingImports, ({ declaration, importKind }) => {
                var _a2;
                if (importKind !== 0 /* Named */)
                    return void 0;
                const namespacePrefix = getNamespaceLikeImportText(declaration);
                const moduleSpecifier = namespacePrefix && ((_a2 = tryGetModuleSpecifierFromDeclaration(declaration)) == null ? void 0 : _a2.text);
                if (moduleSpecifier) {
                    return { kind: 0 /* UseNamespace */, namespacePrefix, usagePosition: position, moduleSpecifier };
                }
            });
        }