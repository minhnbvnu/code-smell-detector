function convertSingleImport(name, moduleSpecifier, checker, identifiers, target, quotePreference) {
            switch (name.kind) {
                case 203 /* ObjectBindingPattern */: {
                    const importSpecifiers = mapAllOrFail(name.elements, (e) => e.dotDotDotToken || e.initializer || e.propertyName && !isIdentifier(e.propertyName) || !isIdentifier(e.name) ? void 0 : makeImportSpecifier(e.propertyName && e.propertyName.text, e.name.text));
                    if (importSpecifiers) {
                        return convertedImports([makeImport(
                            /*name*/
                            void 0, importSpecifiers, moduleSpecifier, quotePreference)]);
                    }
                }
                case 204 /* ArrayBindingPattern */: {
                    const tmp = makeUniqueName(moduleSpecifierToValidIdentifier(moduleSpecifier.text, target), identifiers);
                    return convertedImports([
                        makeImport(factory.createIdentifier(tmp), 
                        /*namedImports*/
                        void 0, moduleSpecifier, quotePreference),
                        makeConst(
                        /*modifiers*/
                        void 0, getSynthesizedDeepClone(name), factory.createIdentifier(tmp))
                    ]);
                }
                case 79 /* Identifier */:
                    return convertSingleIdentifierImport(name, moduleSpecifier, checker, identifiers, quotePreference);
                default:
                    return Debug.assertNever(name, `Convert to ES module got invalid name kind ${name.kind}`);
            }
        }