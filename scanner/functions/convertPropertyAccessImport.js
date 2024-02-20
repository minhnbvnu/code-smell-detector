function convertPropertyAccessImport(name, propertyName, moduleSpecifier, identifiers, quotePreference) {
            switch (name.kind) {
                case 203 /* ObjectBindingPattern */:
                case 204 /* ArrayBindingPattern */: {
                    const tmp = makeUniqueName(propertyName, identifiers);
                    return convertedImports([
                        makeSingleImport(tmp, propertyName, moduleSpecifier, quotePreference),
                        makeConst(
                        /*modifiers*/
                        void 0, name, factory.createIdentifier(tmp))
                    ]);
                }
                case 79 /* Identifier */:
                    return convertedImports([makeSingleImport(name.text, propertyName, moduleSpecifier, quotePreference)]);
                default:
                    return Debug.assertNever(name, `Convert to ES module got invalid syntax form ${name.kind}`);
            }
        }